const express = require("express");
const router = express.Router();
// Defino controlador para el manejo de CRUD
const datosMedicosCtrl = require('./../controllers/datosMedicos.controller');
// Definiendo rutas
router.get('/dni/:dni', datosMedicosCtrl.getAllDatosMedicosDni);
router.get('/', datosMedicosCtrl.getDatosMedicos);
router.post('/', datosMedicosCtrl.createDatosMedicos);
router.get('/:id', datosMedicosCtrl.getDatosMedicosById);
router.get('/dni-latest/:dni', datosMedicosCtrl.getLatestByDni);
router.put('/:id', datosMedicosCtrl.editDatosMedicos);
router.delete('/:id', datosMedicosCtrl.deleteDatosMedicos);
//exportacion del modulo de rutas
module.exports = router;