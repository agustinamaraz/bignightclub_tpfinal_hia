const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { mongoose } = require("./database");


var app = express();
//middlewares
app.use(express.json());
app.use(cors());

//Cargamos el modulo de direccionamiento de rutas
app.use('/api/usuario', require('./routes/usuario.route.js'));
app.use('/api/rol', require('./routes/rol.route.js'));
app.use('/api/especialista', require('./routes/especialista.route.js'));
app.use('/api/paciente', require('./routes/paciente.route.js'));
app.use('/api/datosMedicos', require('./routes/datosMedicos.route.js'));
app.use('/api/anuncio', require('./routes/anuncio.route.js'));
app.use('/api/contacto', require('./routes/contacto.route.js'));
app.use('/api/turno', require('./routes/turno.route.js'));


//setting
const PORT = process.env.PORT || 3000;

//starting the server
app.listen(PORT , () => {
    console.log(`Servidor iniciado en el puerto: `, PORT);
});
