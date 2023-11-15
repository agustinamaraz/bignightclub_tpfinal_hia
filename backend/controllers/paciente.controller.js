const Paciente = require('../models/paciente');

const Contacto = require('../models/contacto');

const DatosMedicos = require ('../models/datosMedicos')
const Turno = require ('../models/turno')
const pacienteCtrl = {}

//get todos
pacienteCtrl.getPacientes = async (req, res) => {
    console.log("Entrando a get")
       var pacientes = await Paciente.find(); 
    res.json(pacientes);
 }
 //get id
 pacienteCtrl.getPacientebyId = async (req, res) => {//siempre cunado las solicitudes vienen por http se reciben obetos el req y el res
    const paciente = await Paciente.findById(req.params.id);
  res.json(paciente);
 }

//get paciente por dni(agregado 23/06)
pacienteCtrl.getPacienteDni = async (req, res) => {
    console.log("ENTRANDO A Paciente po dni");
    criteria = {};
    if (req.query.dniP != null && req.query.dniP!= "") {
      criteria.dni = {$regex: req.query.dniP, $options:""};
    }
    var pacientes = await Paciente.find(criteria);
    res.json(pacientes);
}
  pacienteCtrl.getPacienteNombre = async (req, res) => {
    console.log("BUSCANDO PACIENTE NOMBRE")
    criteria = {};
    if (req.query.nombrE != null && req.query.nombrE != "") {
        criteria.nombre = {$regex: req.query.nombrE, $options:"i"};
    }
    var pacientes = await Paciente.find(criteria);
    res.json(pacientes);
}

pacienteCtrl.getPacienteApellido = async (req, res) => {
    console.log("BUSCANDO PACIENTE APELLIDO")
    criteria = {};
    if (req.query.apellidoE != null && req.query.apellidoE != "") {
        criteria.apellido = {$regex: req.query.apellidoE, $options:"i"};
    }

    var pacientes = await Paciente.find(criteria);
    res.json(pacientes);
}
  

pacienteCtrl.getOnePacienteDni = async (req,res)=>{
    const paciente = await Paciente.findOne({ dni: req.params.dni })
    res.json(paciente);
}

//create
pacienteCtrl.createPaciente = async (req, res) => {
    console.log("Entrando a create")
    console.log(req.body);
    const isNewDni = await Paciente.isThisDniInUse(req.body.dni)
    if (!isNewDni) {
        return res.status(449).json({
            success: false,
            message: 'Este dni ya esta en uso',
        });
    }
    var paciente = new Paciente(req.body);
    try {
        await paciente.save();
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

//edit
pacienteCtrl.editPaciente = async (req, res) => {
    console.log("Entrando a edit")
    const vpaciente = new Paciente(req.body);
    try {
        await Paciente.updateOne({ _id: req.body._id }, vpaciente);
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
pacienteCtrl.deletePaciente = async (req, res) => {
    console.log("Entrando a delete")
    try {
        await Paciente.deleteOne({ _id: req.params.id });
        await DatosMedicos.deleteMany({ paciente: req.params.id });
        await Turno.deleteMany({paciente: req.params.id})
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
 
pacienteCtrl.addContacto  = async (req, res) => {
    var contacto =  new Contacto(req.body);
    const idpaciente = req.params.idpaciente;
    try {
        var anuncio = await Paciente.findById(idpaciente);
        anuncio.contactos.push(contacto)
        await anuncio.save();
        res.json({
            'status': '1',
            'msg': 'Contacto guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg':error.message 
        })
    }
}
pacienteCtrl.deleteContacto = async (req, res) => {
    console.log("Entrando a delete")
    const idpaciente = req.params.idpaciente
    const idcontacto = req.params.idcontacto
    try {
        var paciente = await Paciente.findById(idpaciente);
        paciente.contactos.pull(idcontacto)
        await paciente.save()
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
pacienteCtrl.editContacto = async (req, res) => {
    console.log("Entrando a edit")
    const idpaciente = req.params.idpaciente
    const vpaciente = new Contacto(req.body);
    try {
        var paciente = await Paciente.findById(idpaciente)
        await paciente.contactos.updateOne({ _id: req.body.idcontacto }, vpaciente);
        await paciente.save();
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



pacienteCtrl.getContacto = async (req, res) => {
    const paciente = await Paciente.findById(req.params.idPaciente);
    res.json(paciente.contactos);
}
module.exports = pacienteCtrl; 

