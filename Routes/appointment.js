const express = require('express');
const router = express.Router();
const appointmentController = require('../Controller/appointmentController');
const { protect } = require("../Controller/authController");

router.post('/recherche',protect(["client"]), appointmentController.recherche);
router.post('/reservations',protect(["client"]), appointmentController.reservations);
router.get('/getAllReservations/',protect(["admin"]), appointmentController.getAll);
router.get('/calendar/:professionalId',protect(["professional"]), appointmentController.getAppointmentsForCalendar);
router.get('/confirm/:id', appointmentController.confirm);
router.get('/cancelled/:id', appointmentController.cancelled);


module.exports = router;