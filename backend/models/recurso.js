const mongoose = require('mongoose');
const { Schema } = mongoose; 

const RecursoSchema = new Schema({
    titulo: { type: String },
    tipo: {type:String},
    descripcion : {type :String },
    url : { type:String },
    referencia :{type:String}
})

                          
module.exports = mongoose.models.Recurso || mongoose.model('Recurso', RecursoSchema);