const Contacto = require('../models/contacto');
const contactoCtrl = {}

//get todos
contactoCtrl.getContactos = async (req, res) => {
    console.log("Entrando a get")
       var contacto = await Contacto.find(); 
    res.json(contacto);
 }
 //get id
 contactoCtrl.getContactobyId = async (req, res) => {//siempre cunado las solicitudes vienen por http se reciben obetos el req y el res
    const contacto = await Contacto.findById(req.params.id);
  res.json(contacto);
 }



//create
contactoCtrl.createPaciente = async (req, res) => {
    console.log("Entrando a create")
    console.log(req.body);
    var contacto = new Contacto(req.body);
    try {
        await contacto.save();
        res.json({
            'status': '1',
            'msg': 'Contacto guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

//edit
contactoCtrl.editContacto = async (req, res) => {
    console.log("Entrando a edit")
    const vcontacto = new Contacto(req.body);
    try {
        await Contacto.updateOne({ _id: req.body._id }, vcontacto);
        res.json({
            'status': '1',
            'msg': 'Contacto updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
//delete
contactoCtrl.deleteContacto = async (req, res) => {
    console.log("Entrando a delete")
    try {
        await Contacto.deleteOne({ _id: req.params.id });
        res.status(200).json({
            status: '1',
            msg: 'Contacto removed'
        })
    } catch (error) {

        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = contactoCtrl; 