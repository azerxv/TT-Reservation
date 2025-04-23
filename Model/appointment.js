const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  professional: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateOnly: { type: String, required: true }, // Format YYYY-MM-DD
  heureDebut: { type: String, required: true }, // Format HH:mm (ex: 14:30)
  heureFin: { type: String, required: true }, // Format HH:mm (ex: 15:30)  
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Appointment', appointmentSchema);