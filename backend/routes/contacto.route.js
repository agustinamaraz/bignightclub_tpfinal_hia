const express = require('express');
const router = express.Router();

//defino controlador para el manejo de CRUD
const contactoCtrl = require('./../controllers/contacto.controller');

// definiendo rutas
router.get('/', contactoCtrl.getContactos);
router.get('/:id', contactoCtrl.getContactobyId);
router.post('/', contactoCtrl.createPaciente);
router.put('/editarContacto/:id', contactoCtrl.editContacto);
router.delete('/:id', contactoCtrl.deleteContacto);

//exportacion del modulo de rutas
module.exports = router;