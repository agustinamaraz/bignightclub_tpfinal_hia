const Especialista = require('./../models/especialista')
const Turno = require ('../models/turno')
const especialistaCtrl = {}

especialistaCtrl.createEspecialista = async (req, res) => {
    //en req.body se espera que vengan los datos de usuario a crear
    //console.log("entrando a crear un especialista...");
    const especialista = new Especialista(req.body);
    try {
        await especialista.save();
        res.status(200).json({
            'status': '1',
            'msg': 'especialista guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}
/*
especialistaCtrl.busquedaEspecialista = async (req, res) => {
    console.log("BUSCANDO ESPECIALISTA NOMBRE")
        var especialista = await Especialista.find({
          $or: [
            { nombre: { $regex: req.query.dato, $options: "i" } },
            { apellido: { $regex: req.query.dato, $options: "i"} }
          ],

        });
        

        res.json(especialista);
      };*/

especialistaCtrl.getEspecialistas = async (req, res) => {
    
    var esp = await Especialista.find();
    res.json(esp);
}

especialistaCtrl.getEspecialista = async (req, res) => {
    console.log("entrando al meotod GET ESPECIALISTAAAAAAAA POR IDDDDDDD:::: ")
    const e = await Especialista.findById(req.params.id);
    res.json(e);
}

especialistaCtrl.getEspecialistaNombre = async (req, res) => {
    criteria = {};
    if (req.query.nombrE != null && req.query.nombrE != "") {
        criteria.nombre = {$regex: req.query.nombrE, $options:"i"};
    }

    var especialistas = await Especialista.find(criteria);
    res.json(especialistas);
}

especialistaCtrl.getEspecialistaApellido = async (req, res) => {
    criteria = {};
    if (req.query.apellidoE != null && req.query.apellidoE != "") {
        criteria.apellido = {$regex: req.query.apellidoE, $options:"i"};
    }

    var especialistas = await Especialista.find(criteria);
    res.json(especialistas);
}

especialistaCtrl.editEspecialista = async (req, res) => {
    const ve = new Especialista(req.body);
    try {
        await Especialista.updateOne({ _id: req.body._id }, ve);
        res.json({
            'status': '1',
            'msg': 'Especialista updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
especialistaCtrl.deleteEspecialista = async (req, res) => {
    try {
        await Especialista.deleteOne({ _id: req.params.id });
        await Turno.deleteMany({especialista:req.params.id})
        res.json({
            status: '1',
            msg: 'Especialista removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

especialistaCtrl.getEspecialistaDni = async (req, res) => {
    //console.log("ENTRANDO A ESPECIALISTAS POR  dni");
    criteria = {};
    if (req.query.dniP != null && req.query.dniP!= "") {
      criteria.dni = {$regex: req.query.dniP, $options:""};
    }
    var especialistas = await Especialista.find(criteria);
    res.json(especialistas);
}

//exportacion del modulo controlador
module.exports = especialistaCtrl;