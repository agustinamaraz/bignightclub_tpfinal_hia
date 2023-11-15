const express = require("express");
const router = express.Router();

//defino controlador para el manejo de CRUD
const usuarioCtrl = require('./../controllers/usuario.controller');
const autCtrl = require('./../controllers/auth.controller');
// definiendo rutasz

router.get('/dni', usuarioCtrl.getUsuarioPorDni);
router.get('/', usuarioCtrl.getTodosUsuarios);
router.post('/login', usuarioCtrl.loginUsuario);
router.post('/login-email', usuarioCtrl.loginUsuarioEmail); //auth estaba en todos mennos este creo
router.get('/confirm/:token',[],usuarioCtrl.confirm);
router.delete('/eliminar',usuarioCtrl.deleteUserNotVerified);
router.post('/reset-ask', usuarioCtrl.askReset);
router.post('/reset/:token',[], usuarioCtrl.resetPassword);
router.post('/', usuarioCtrl.createUsuario);
router.post('/gmail', usuarioCtrl.googleLoggedIn);
router.put('/:id', usuarioCtrl.editUsuario); 
router.delete('/:id', usuarioCtrl.deleteUsuario);
router.get('/:id', usuarioCtrl.getUsuario);
router.get('/', usuarioCtrl.getUsuarios);

//exportacion del modulo de rutas
module.exports = router;
