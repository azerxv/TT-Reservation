const User = require('../Model/user');

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  const { nom, prenom, age, sexe, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { nom, prenom, age, sexe, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur mis à jour", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Récupérer un utilisateur par ID
exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Exclure le mot de passe

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclure le mot de passe
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
exports.getAllClient = async (req, res) => {
    try {
      // Récupérer uniquement les utilisateurs ayant le rôle 'client'
      const users = await User.find({ role: 'client',_id:req.params.id }).select("-password"); // Exclure le mot de passe
     // console.log("users",users)
      res.json(users);
    } catch (error) {
        
      res.status(500).json({ message: "Erreur serveur", error });
    }
  };
