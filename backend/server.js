require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectDB = require('./database');

const User = require('./models/User');
const Prescription = require('./models/Prescription');
const HealthRecord = require('./models/HealthRecord');
const Pharmacy = require('./models/Pharmacy');
const PharmacyInventory = require('./models/PharmacyInventory');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

connectDB();

const JWT_SECRET = process.env.JWT_SECRET;

// ---- AUTHENTICATION API ---- //
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password, role, language } = req.body;
        const hash = await bcrypt.hash(password, 10);
        
        const validRoles = ['Patient', 'Doctor', 'Pharmacy', 'Admin'];
        const finalRole = validRoles.includes(role) ? role : 'Patient';

        const user = await User.create({ name, email, password: hash, role: finalRole, language: language || 'en' });
        
        // Output userId as string for frontend compatibility if needed
        res.status(201).json({ message: 'User registered successfully', userId: user._id.toString() });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Email already exists or invalid data' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) return res.status(404).json({ error: 'USER_NOT_FOUND' });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid Password' });
        
        const token = jwt.sign({ id: user._id.toString(), role: user.role, name: user.name, language: user.language }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, user: { id: user._id.toString(), name: user.name, role: user.role, language: user.language } });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Authentication Middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ error: 'Unauthorized missing token' });
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

// ---- ADMIN USERS API ---- //
app.get('/api/admin/users', authenticateToken, async (req, res) => {
    if (req.user.role !== 'Admin') return res.status(403).json({ error: 'Admin access required' });
    try {
        const users = await User.find({}, 'name email role');
        const formattedUsers = users.map(u => ({ id: u._id.toString(), ...u.toObject() }));
        res.json(formattedUsers);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

// ---- PRESCRIPTIONS API ---- //
app.post('/api/prescriptions', authenticateToken, async (req, res) => {
    if (req.user.role !== 'Doctor') return res.status(403).json({ error: 'Only Doctors can prescribe' });
    try {
        const { patient_id, medicines, dosage } = req.body;
        if (!patient_id) return res.status(400).json({ error: 'Requires a patient_id' });
        
        if (!mongoose.Types.ObjectId.isValid(patient_id)) {
            return res.status(400).json({ error: 'Invalid Patient ID format. Must be a 24-character hexadecimal string.' });
        }

        const p = await Prescription.create({ patient_id, doctor_name: req.user.name, medicines, dosage });
        res.json({ message: 'Prescription added', id: p._id.toString() });
    } catch (err) {
        console.error('Error creating prescription:', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

app.get('/api/prescriptions', authenticateToken, async (req, res) => {
    try {
        const query = req.user.role === 'Patient' ? { patient_id: req.user.id } : {};
        const prescriptions = await Prescription.find(query);
        res.json(prescriptions);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

// ---- HEALTH RECORDS API ---- //
app.get('/api/health-records', authenticateToken, async (req, res) => {
    try {
        const query = req.user.role === 'Patient' ? { patient_id: req.user.id } : {};
        const records = await HealthRecord.find(query);
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/api/health-records', authenticateToken, async (req, res) => {
    try {
        const { details } = req.body;
        const patient_id = req.user.role === 'Patient' ? req.user.id : req.body.patient_id;
        
        const h = await HealthRecord.create({
            patient_id,
            document_path: 'uploaded_file.pdf',
            details: details || 'New User Data Record'
        });
        res.json({ message: 'Health Record Uploaded', id: h._id.toString() });
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

app.put('/api/health-records/:id/verify', authenticateToken, async (req, res) => {
    if (req.user.role !== 'Doctor' && req.user.role !== 'Admin') {
        return res.status(403).json({ error: 'Only Doctors and Admins can verify records' });
    }
    try {
        const result = await HealthRecord.findByIdAndUpdate(req.params.id, { status: 'Verified' }, { new: true });
        if (!result) return res.status(404).json({ error: 'Record not found' });
        res.json({ message: 'Record verified successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});


// ---- PHARMACY DB API ---- //
app.get('/api/pharmacy/inventory', authenticateToken, async (req, res) => {
    try {
        if (req.user.role === 'Pharmacy') {
            const inventory = await PharmacyInventory.find({ pharmacy_user_id: req.user.id });
            const output = inventory.map(i => ({ 
                id: i._id.toString(), 
                medicine_name: i.medicine_name, 
                dosage: i.dosage,
                status: i.status 
            }));
            return res.json(output);
        } else {
            // Patient/Doctor Search functionality
            const { lat, lng } = req.query;
            let pharmacies = [];
            
            if (lat && lng && !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lng))) {
                pharmacies = await Pharmacy.aggregate([
                    {
                        $geoNear: {
                            near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                            distanceField: "dist_calculated",
                            maxDistance: 100000, // 100km radius max
                            spherical: true
                        }
                    }
                ]);
            } else {
                pharmacies = await Pharmacy.find({}).lean();
            }

            // Make a lookup map for pharmacies
            const pharmMap = {};
            pharmacies.forEach(p => {
                let distObj = 'Unknown location';
                if (p.dist_calculated != null) {
                    distObj = (p.dist_calculated / 1000).toFixed(1) + ' km'; // Map meters to kms
                } else if (p.distance) {
                    distObj = p.distance; // Fallback to mock string distance
                }
                pharmMap[p.owner_id.toString()] = {
                    name: p.name,
                    address: p.address,
                    distance: distObj
                };
            });

            // Get all inventory, map user details
            const inventories = await PharmacyInventory.find().populate('pharmacy_user_id', 'name');
            const data = inventories.map(inv => {
                const ownerId = inv.pharmacy_user_id._id.toString();
                const pharmacyData = pharmMap[ownerId] || {};
                return {
                    id: inv._id.toString(),
                    medicine_name: inv.medicine_name,
                    dosage: inv.dosage,
                    status: inv.status,
                    pharmacy_name: pharmacyData.name || inv.pharmacy_user_id.name,
                    address: pharmacyData.address || 'Address not registered',
                    distance: pharmacyData.distance || 'Unknown'
                };
            });

            // If we have geospatial sort from mongo, sort `data` so the closest ones appear first.
            if (lat && lng) {
                 // The array 'pharmacies' is sorted by distance inherently by $geoNear.
                 // Let's sort `data` based on the position of its owner_id in the `pharmacies` array.
                 const orderMap = {};
                 pharmacies.forEach((p, idx) => orderMap[p.owner_id.toString()] = idx);
                 
                 data.sort((a, b) => {
                     const idxA = orderMap[invOwnerId(inventories, a.id)] ?? 999;
                     const idxB = orderMap[invOwnerId(inventories, b.id)] ?? 999;
                     return idxA - idxB;
                 });
            }

            res.json(data);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/api/pharmacy/inventory', authenticateToken, async (req, res) => {
    if (req.user.role !== 'Pharmacy') return res.status(403).json({ error: 'Allowed only for Pharmacy role' });
    try {
        const { medicine_name, dosage, status } = req.body;
        const inv = await PharmacyInventory.create({ pharmacy_user_id: req.user.id, medicine_name, dosage, status });
        res.json({ message: 'Medicine added to inventory', id: inv._id.toString() });
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

app.put('/api/pharmacy/inventory/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'Pharmacy') return res.status(403).json({ error: 'Allowed only for Pharmacy role' });
    try {
        const { status } = req.body;
        const result = await PharmacyInventory.findOneAndUpdate(
            { _id: req.params.id, pharmacy_user_id: req.user.id },
            { status },
            { new: true }
        );
        if (!result) return res.status(404).json({ error: 'Item not found or unauthorized' });
        res.json({ message: 'Stock status updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

app.delete('/api/pharmacy/inventory/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'Pharmacy') return res.status(403).json({ error: 'Allowed only for Pharmacy role' });
    try {
        const result = await PharmacyInventory.findOneAndDelete({ _id: req.params.id, pharmacy_user_id: req.user.id });
        if (!result) return res.status(404).json({ error: 'Item not found or unauthorized' });
        res.json({ message: 'Medicine removed' });
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/pharmacy', authenticateToken, async (req, res) => {
    try {
        const authPharmacies = await Pharmacy.find({});
        res.json(authPharmacies);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

// ---- STATISTICS API ---- //
app.get('/api/stats/summary', authenticateToken, async (req, res) => {
    try {
        const [users, prescriptions, records, pharmacies] = await Promise.all([
            User.countDocuments(),
            Prescription.countDocuments(),
            HealthRecord.countDocuments(),
            Pharmacy.countDocuments()
        ]);
        res.json({ users, prescriptions, records, pharmacies });
    } catch (err) {
        res.status(500).json({ error: 'Stats error' });
    }
});

app.get('/api/stats/activity', authenticateToken, async (req, res) => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Privacy: Patients see only their own data. All other roles see global activity.
        const isPatient = req.user.role === 'Patient';
        const patientId = isPatient ? new mongoose.Types.ObjectId(req.user.id) : null;

        const prescriptionMatch = isPatient
            ? { patient_id: patientId, date: { $gte: sevenDaysAgo } }
            : { date: { $gte: sevenDaysAgo } };

        const recordMatch = isPatient
            ? { patient_id: patientId, created_at: { $gte: sevenDaysAgo } }
            : { created_at: { $gte: sevenDaysAgo } };

        const [prescriptions, records] = await Promise.all([
            Prescription.aggregate([
                { $match: prescriptionMatch },
                { $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    count: { $sum: 1 }
                }},
                { $sort: { _id: 1 } }
            ]),
            HealthRecord.aggregate([
                { $match: recordMatch },
                { $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
                    count: { $sum: 1 }
                }},
                { $sort: { _id: 1 } }
            ])
        ]);

        res.json({ prescriptions, records });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Activity stats error' });
    }
});

app.get('/api/stats/roles', authenticateToken, async (req, res) => {
    try {
        const roles = await User.aggregate([
            { $group: { _id: "$role", count: { $sum: 1 } } }
        ]);
        res.json(roles);
    } catch (err) {
        res.status(500).json({ error: 'Role stats error' });
    }
});

// Helper for sorting
function invOwnerId(inven, invId) {
    const f = inven.find(i => i._id.toString() === invId);
    return f ? f.pharmacy_user_id._id.toString() : '';
}

// ---- WEBRTC SIGNALING (SOCKET.IO) ---- //
io.on('connection', (socket) => {
    console.log('User connected to WebRTC sigaling:', socket.id);
    
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        console.log(`User ${userId} joined room ${roomId}`);
        socket.to(roomId).emit('user-connected', userId);
        
        socket.on('offer', (offer, toId) => {
            socket.to(roomId).emit('offer', offer, userId);
        });

        socket.on('answer', (answer, toId) => {
            socket.to(roomId).emit('answer', answer, userId);
        });

        socket.on('ice-candidate', (candidate, toId) => {
            socket.to(roomId).emit('ice-candidate', candidate, userId);
        });

        socket.on('disconnect', () => {
            socket.to(roomId).emit('user-disconnected', userId);
        });
    });
});

const PORT = process.env.PORT || 5005;
server.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
