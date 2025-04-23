const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  age: { type: Number, required: true },
  sexe: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'professional', 'client']},
  // Champs spécifiques aux professionnels
  profession: { type: String, required: false },
  //speciality: String,
  //availability: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Availability' }]
});

// Hashing du mot de passe avant sauvegarde
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});



module.exports = mongoose.model('User', userSchema);