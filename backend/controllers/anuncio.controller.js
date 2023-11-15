
const Anuncio = require('../models/anuncio');
const Recurso = require('../models/recurso');
const AnuncioCtrl = {}

//get todos
AnuncioCtrl.getAnuncios = async (req, res) => {
    console.log("Entrando a get")
       var anuncios = await Anuncio.find(); 
    res.json(anuncios);
 }
//create
AnuncioCtrl.createAnuncio = async (req, res) => {
    console.log("Entrando a create")
    console.log(req.body);
    var anuncio = new Anuncio(req.body);
    try {
        await anuncio.save();
        res.json({
            'status': '1',
            'msg': 'Paciente guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}
//get one
AnuncioCtrl.getAnuncio  = async (req, res) => {
    console.log("Entrando a get by id")
    const anuncio = await Anuncio.findById(req.params.id);
    res.json(anuncio);
},
AnuncioCtrl.getAnuncioFechaDisponible   = async (req, res) => {
    console.log("Entrando a Fecha")
    let fecha = req.params.fecha;
    console.log(fecha)
    var anun = await Anuncio.find(
        
        {
            fechaHasta:{
                $gte:fecha
            }
        }
    )
    console.log(anun)
    res.json(anun);
    // console.log("Entrando a get by id")
  //  const anuncio = await Anuncio.findById(req.params.id);
//    res.json(anuncio);
}

//edit
AnuncioCtrl.editAnuncio = async (req, res) => {
    console.log("Entrando a edit")
    const vanuncio = new Anuncio(req.body);
    try {
        await Anuncio.updateOne({ _id: req.body._id }, vanuncio);
        res.json({
            'status': '1',
            'msg': 'Paciente updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
//delete
AnuncioCtrl.deleteAnuncio = async (req, res) => {
    console.log("Entrando a delete")
    try {
        await Anuncio.deleteOne({ _id: req.params.id });
 
        res.status(200).json({
            status: '1',
            msg: 'Paciente removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
AnuncioCtrl.addRecurso  = async (req, res) => {
    var recurso =  new Recurso(req.body);
    const idanuncio = req.params.idanuncio;
    try {
        var anuncio = await Anuncio.findById(idanuncio);
        anuncio.recursos.push(recurso)
        await anuncio.save();
        res.json({
            'status': '1',
            'msg': 'Recurso guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}
AnuncioCtrl.deleteRecurso = async (req, res) => {
    console.log("Entrando a delete")
    const idanuncio = req.params.idanuncio
    const idrecurso = req.params.idrecurso
    try {
        var anuncio = await Anuncio.findById(idanuncio);
        anuncio.recursos.pull(idrecurso)
        await anuncio.save()
        //await anuncio.deleteOne({ _id: req.params.id });
        res.status(200).json({
            status: '1',
            msg: 'Recurso removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
           // 'msg': 'Error procesando la operacion'
            'msg':error.message 
        })
    }
}
module.exports = AnuncioCtrl; 