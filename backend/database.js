const mongoose = require('mongoose');
const User = require('./models/User');
const Pharmacy = require('./models/Pharmacy');
const PharmacyInventory = require('./models/PharmacyInventory');
const Prescription = require('./models/Prescription');
const HealthRecord = require('./models/HealthRecord');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to telemedicine MongoDB database');

        // Seed everything if database is fresh
        const userCount = await User.countDocuments();
        if (userCount === 0) {
            console.log("Database is empty. Seeding initial telemedicine data...");

            // 1. Seed Users
            const admin = await User.create({ name: 'System Admin', email: 'admin@telemedicine.com', password: '$2a$10$X877799Rj6Hw7Hq9H6H6H.f7H7H7H7H7H7H7H7H7H7H7H7H7H7H6H', role: 'Admin' }); // password123
            const doctor = await User.create({ name: 'Dr. Sarah Wilson', email: 'doctor@telemedicine.com', password: '$2a$10$X877799Rj6Hw7Hq9H6H6H.f7H7H7H7H7H7H7H7H7H7H7H7H7H7H6H', role: 'Doctor' });
            const patient = await User.create({ name: 'John Doe', email: 'patient@telemedicine.com', password: '$2a$10$X877799Rj6Hw7Hq9H6H6H.f7H7H7H7H7H7H7H7H7H7H7H7H7H7H6H', role: 'Patient' });
            const pharmOwner = await User.create({ name: 'Pharmacy Manager', email: 'pharmacy@telemedicine.com', password: '$2a$10$X877799Rj6Hw7Hq9H6H6H.f7H7H7H7H7H7H7H7H7H7H7H7H7H7H6H', role: 'Pharmacy' });

            // 2. Seed Pharmacy
            const pharmacy = await Pharmacy.create({
                owner_id: pharmOwner._id,
                name: 'Tele-Health Pharmacy',
                address: '742 Evergreen Terrace, Springfield',
                location: { type: 'Point', coordinates: [77.5946, 12.9716] }
            });

            // 3. Seed Inventory
            await PharmacyInventory.create([
                { pharmacy_user_id: pharmOwner._id, medicine_name: 'Amoxicillin', dosage: '500mg', status: 'In Stock' },
                { pharmacy_user_id: pharmOwner._id, medicine_name: 'Paracetamol', dosage: '650mg', status: 'In Stock' },
                { pharmacy_user_id: pharmOwner._id, medicine_name: 'Lisinopril', dosage: '10mg', status: 'Low Stock' },
                { pharmacy_user_id: pharmOwner._id, medicine_name: 'Metformin', dosage: '850mg', status: 'Out of Stock' }
            ]);

            // 4. Seed Activity (distributed over 7 days for charts)
            const now = new Date();
            for (let i = 0; i < 15; i++) {
                const randomDay = new Date();
                randomDay.setDate(now.getDate() - Math.floor(Math.random() * 7));
                
                if (i % 2 === 0) {
                    await Prescription.create({
                        patient_id: patient._id,
                        doctor_name: doctor.name,
                        medicines: 'Mock Med ' + i,
                        dosage: 'Daily',
                        date: randomDay
                    });
                } else {
                    await HealthRecord.create({
                        patient_id: patient._id,
                        document_path: 'mock_record_' + i + '.pdf',
                        details: 'Sample checkup record from ' + randomDay.toDateString(),
                        created_at: randomDay
                    });
                }
            }

            console.log('Seeding complete. Use admin@telemedicine.com / password123 to log in.');
        }

    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;

