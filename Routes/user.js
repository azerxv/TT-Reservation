const express = require('express');
const userController = require('../Controller/userController');
const router = express.Router();
const { protect } = require("../Controller/authController");

router.delete("/:id",protect(["admin","professional"]), userController.deleteUser);
router.put("/:id",protect(["professional","admin","client"]),userController.updateUser);
router.get("/One/:id",protect(["professional","admin","client"]), userController.getOneUser);
router.get("/",protect(["admin"]), userController.getAllUsers);
router.get("/allClient/:id",protect(["professional"]), userController.getAllClient);
module.exports = router;