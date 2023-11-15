const mongoose = require('mongoose');
const { Schema } = mongoose; 
const Recursos = require('./recurso');
const AnuncioSchema = new Schema({
    titulo: { type: String, required: true },
    descripcion:{type:String,required:true},
    fechaDesde: {type:String,required:true},
    fechaHasta: { type: String, required: true },
    estado : {type : String  , required :true},
    recursos:[{type:Recursos.schema}]
})

                          
module.exports = mongoose.models.Anuncio || mongoose.model('Anuncio', AnuncioSchema);