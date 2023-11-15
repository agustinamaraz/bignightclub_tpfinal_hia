const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const rolCtrl = require('./../controllers/rol.controller.js');
// definiendo rutas
router.post('/', rolCtrl.createRol);
router.put('/:id', rolCtrl.editRol);
router.delete('/:id', rolCtrl.deleteRol);
router.get('/:id', rolCtrl.getRol);
router.get('/', rolCtrl.getRoles);
//exportacion del modulo de rutas
module.exports = router;
