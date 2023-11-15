const mongoose = require('mongoose');
const { Schema } = mongoose; 
const Paciente = require('./paciente');
const DatosMedicosSchema = new Schema({
    motivo: { type:String, required:true},
    paciente: {type: Schema.Types.ObjectId, ref: Paciente, required:true },
    fecha: { type: String, required: true },
    peso: { type: Number, required: true },
    imc: {type: Number, required: true },
    talla: { type: Number, required: true },
    tension_arterial:{ type: String, required: true },
    diagnostico:{ type:String, required: true },
    temperatura:{type:Number, required:true},
    fechaMenstruacion:{type:String, required:true},
    centroSalud:{type:String, required:true}
})

module.exports = mongoose.models.DatosMedicos || mongoose.model('DatosMedicos', DatosMedicosSchema);