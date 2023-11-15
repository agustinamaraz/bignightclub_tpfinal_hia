const mongoose = require('mongoose');
const { Schema } = mongoose; 

const EspecialistaSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: {type:String,required:true},
    profesion: { type: String, required: true },
    dni:{ type:String, required: true},
    centroSalud:{ type:String, required: true}
})

                          
module.exports = mongoose.models.Especialista || mongoose.model('Especialista', EspecialistaSchema);