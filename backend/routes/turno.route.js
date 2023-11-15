const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const turnoCtrl = require('./../controllers/turno.controller');
// definiendo rutas

router.post('/', turnoCtrl.createTurno);
router.get('/turnosDisponibles', turnoCtrl.getTurnosDisponibles);
router.put('/:id', turnoCtrl.editTurno);
router.get('/misTurnos', turnoCtrl.getTurnosPaciente);
router.delete('/:id', turnoCtrl.deleteTurno);
router.get('/:id', turnoCtrl.getTurno);
router.get('/', turnoCtrl.getTurnos);

//exportacion del modulo de rutas
module.exports = router;
