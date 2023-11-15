const express = require('express');
const router = express.Router();

//defino controlador para el manejo de CRUD
const anuncioCtrl = require('./../controllers/anuncio.controller');

// definiendo rutas
router.get('/', anuncioCtrl.getAnuncios);
router.post('/', anuncioCtrl.createAnuncio);
router.get('/:id', anuncioCtrl.getAnuncio);
router.put('/:id', anuncioCtrl.editAnuncio);
router.delete('/:id', anuncioCtrl.deleteAnuncio);
router.post('/:idanuncio/recurso',anuncioCtrl.addRecurso);
router.delete('/:idanuncio/recurso/:idrecurso',anuncioCtrl.deleteRecurso)
router.get('/verFechaDisponible/:fecha',anuncioCtrl.getAnuncioFechaDisponible)
//exportacion del modulo de rutas
module.exports = router;