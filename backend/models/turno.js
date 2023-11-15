const mongoose = require('mongoose');
const { Schema } = mongoose;

const Especialista = require('./especialista');
const Paciente = require('./paciente');

const TurnoSchema = new Schema({
    fecha: {type:String},
    cantidadTurnos:{type:Number},
    hora:{type:String},
    lapso:{type:String},
    especialista: { type: Schema.Types.ObjectId, ref: Especialista},
    paciente: { type: Schema.Types.ObjectId, ref: Paciente || null },
    estado: {type :String},
    centroSalud:{ type:String}

})

                          
module.exports = mongoose.models.Turno || mongoose.model('Turno', TurnoSchema);
