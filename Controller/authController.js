const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Model/user');

exports.register = async (req, res) => {
  try {
    const { nom,prenom, email, password,age,sexe, role, profession } = req.body;
    
    const user = new User({
      nom,
      prenom,
      email,
      password,
      role,
      age,
      sexe,
      profession: role == 'professional' ? profession : undefined
    });

    const new_user=await user.save();
    
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: '1h'
    // });

    res.status(201).json({ message :  new_user});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET ||"KeySecret", {
      expiresIn: '1h'
    });

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.protect = (roles = []) => async (req, res, next) => {
  try {
    // Vérifier la présence du token
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: "Accès refusé, token manquant." });
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "Utilisateur non trouvé." });
    }

    // Vérifier l'autorisation si des rôles sont définis
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accès interdit, rôle non autorisé." });
    }

    next(); // Passer au contrôleur si tout est OK
  } catch (error) {
    res.status(401).json({ message: "Token invalide ou expiré." });
  }
};
