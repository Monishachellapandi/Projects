const mongoose = require('mongoose');

const PharmacyInventorySchema = new mongoose.Schema({
    pharmacy_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    medicine_name: { type: String, required: true },
    dosage: { type: String, default: 'N/A' },
    status: { type: String, default: 'In Stock' }
});

module.exports = mongoose.model('PharmacyInventory', PharmacyInventorySchema);
