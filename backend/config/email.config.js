const nodemailer = require('nodemailer');

const mail = {
    user: 'centrodesaludutil@gmail.com',
    pass: 'nagcujcrpwpjgndc'
}

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mail.user, 
        pass: mail.pass,
    },
});

const sendEmail = async (email, subject, html) => {
    try {
        
        await transporter.sendMail({
            from: ` <${ mail.user }>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "Hola", // plain text body
            html, // html body
        });

    } catch (error) {
        console.log('Algo no va bien con el email', error);
    }
}

const sendEmailPassword = async (email, subject, html) => {
    try {
        console.log("Enviando email")
        await transporter.sendMail({
            from: ` <${ mail.user }>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "Hola", // plain text body
            html, // html body
        });
        console.log("Email enviado");
    } catch (error) {
        console.log('Error con el mail', error);
    }
}
const getTemplate = (username, token) => {
    return `
        <head>
            <link rel="stylesheet" href="../../proyfrontendgrupo8/src/assets/styles/styleEmail.css">
        </head>    
        <link
        <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap"
        rel="stylesheet"
        />
        
        <div id="email___content">
            <h2>Hola ${ username }</h2>
            
        <div class="container">
        <div class="shapes"></div>
        <div class="card">
        
        <div class="text-container">
            <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
            <a
                href="http://3.82.255.160/confirm/${ token }"
                target="_blank"
            >Confirmar Cuenta</a>
            </div>
        </div>
        </div>
        </div>
    `;
}
const getTemplatePassword = (username, token) => {
    return `
        <head>
        <link rel="stylesheet" href="../../proyfrontendgrupo8/src/assets/styles/styleEmail.css"> 
        <link
        <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap"
        rel="stylesheet"
        />
        </head>
        
        <div id="email___content">
            <h2>Hola ${ username }</h2>
            
        <div class="container">
        <div class="shapes"></div>
        <div class="card">
            <p>Para restablecer su contraseña, ingrese al siguiente enlace</p>
            <a
                href="http://3.82.255.160/reset/${ token }"
                target="_blank"
            >Restablecer contraseña</a>
            </div>
        </div>
        </div>
        </div>
    `;
}

module.exports = {
    sendEmail,
    getTemplate,
    sendEmailPassword,
    getTemplatePassword
}