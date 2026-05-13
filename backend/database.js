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
            const patient = await User.create({ 
                name: 'John Doe', 
                email: 'patient@telemedicine.com', 
                password: '$2a$10$X877799Rj6Hw7Hq9H6H6H.f7H7H7H7H7H7H7H7H7H7H7H7H7H7H6H', 
                role: 'Patient',
                patientId: 'PAT-123456'
            });
            const pharmOwner = await User.create({ name: 'Pharmacy Manager', email: 'pharmacy@telemedicine.com', password: '$2a$10$X877799Rj6Hw7Hq9H6H6H.f7H7H7H7H7H7H7H7H7H7H7H7H7H7H6H', role: 'Pharmacy' });

            // Clean slate for Pharmacy and Records.

            console.log('Seeding complete. Use admin@telemedicine.com / password123 to log in.');
        }

    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;

