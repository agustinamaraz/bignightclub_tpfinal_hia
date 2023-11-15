const Rol = require('./../models/rol')
const rolCtrl = {}

rolCtrl.createRol = async (req, res) => {
    //en req.body se espera que vengan los datos de usuario a crear
    const rol = new Rol(req.body);
    try {
        await rol.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Rol guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

rolCtrl.getRoles = async (req, res) => {
    var roles = await Rol.find();
    res.json(roles);
}

rolCtrl.getRol = async (req, res) => {
    const rol = await Rol.findById(req.params.id);
    res.json(rol);
}

rolCtrl.editRol = async (req, res) => {
    const vrol = new Rol(req.body);
    try {
        await Rol.updateOne({ _id: req.body._id }, vrol);
        res.json({
            'status': '1',
            'msg': 'Rol updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
rolCtrl.deleteRol = async (req, res) => {
    try {
        await Rol.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Rol removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

//exportacion del modulo controlador
module.exports = rolCtrl;