const express = require('express');
const router = express.Router();

//defino controlador para el manejo de CRUD
const pacienteCtrl = require('./../controllers/paciente.controller');

// definiendo rutas
router.get('/', pacienteCtrl.getPacientes);
router.get('/dni', pacienteCtrl.getPacienteDni);//agregado 23/06
router.get('/nombre', pacienteCtrl.getPacienteNombre);//agregado 10/07
router.get('/apellido', pacienteCtrl.getPacienteApellido);//agregado 10/07
router.get('/dniOne/:dni', pacienteCtrl.getOnePacienteDni);
router.get('/:id', pacienteCtrl.getPacientebyId);
router.post('/', pacienteCtrl.createPaciente);
router.put('/:id', pacienteCtrl.editPaciente);
router.delete('/:id', pacienteCtrl.deletePaciente);
router.post('/:idpaciente/recurso',pacienteCtrl.addContacto);
router.delete('/:idpaciente/recurso/:idcontacto',pacienteCtrl.deleteContacto)
router.get('/contactog/:idPaciente', pacienteCtrl.getContacto);
router.put('/:idpaciente/contacto/:idcontacto', pacienteCtrl.editContacto);
//exportacion del modulo de rutas
module.exports = router;