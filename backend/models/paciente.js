const mongoose = require('mongoose');
const { Schema } = mongoose; 
const Contacto = require('./contacto');

const PacienteSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: {type:String,required:true},
    fechaNac: { type: String, required: true },
    dni:{ type:String, required: true},
    genero:{type:String, required:true},
    contactos:[{type:Contacto.schema}]
})

PacienteSchema.statics.isThisDniInUse = async function (dni) {
        if (!dni) throw new Error('Dni invalido');
        try {
            const patient = await this.findOne({ dni });
            if (patient) return false;
            return true;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    };

module.exports = mongoose.models.Paciente || mongoose.model('Paciente', PacienteSchema);