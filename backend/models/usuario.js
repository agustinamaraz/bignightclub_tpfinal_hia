const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Rol = require('./rol');
const UsuarioSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email:{type:String, require:true},
    code: { type: String },
    status: { type: String, required: true, default: 'UNVERIFIED' },
    rol: { type: Schema.Types.ObjectId, ref: Rol, required: true }, //administrador - gestor - paciente
    dni: {type: String, required:true}
});

UsuarioSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) return next(err);

        this.password = hash;
        next();
        });
    }
});
UsuarioSchema.methods.isVerified = function () {
    return this.status === 'VERIFIED';
};
UsuarioSchema.methods.comparePassword = async function (password) {
    if (this.isModified('password')) {
        // No realices el hash del password aquí, simplemente pasa al siguiente middleware
        return next();}
        else{
    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        console.log( error.message);
    }
}
};
UsuarioSchema.statics.isThisEmailInUse = async function (email) {
    if (!email) throw new Error('Email invalido');
    try {
        const user = await this.findOne({ email });
        if (user) return false;
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
};
UsuarioSchema.statics.isThisUsernameInUse = async function (username) {
    if (!username) throw new Error('Nombre de usuario inválido');
    try {
        const user = await this.findOne({ username });
        if (user) return false;
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
};
//exporto objeto para que pueda ser usado en otros lugares
module.exports = mongoose.model('Usuario', UsuarioSchema);