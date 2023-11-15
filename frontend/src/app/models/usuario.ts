import { Rol } from "./rol";

export class Usuario {
    _id: string;
    username: string;
    password: string;
    email: string;
    rol: Rol;
    dni:string;

    constructor(id:string="", username:string="", password:string="", email:string="" ,rol:Rol=new Rol(), dni:string=""){
        this._id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.rol = rol;
        this.dni = dni;
    }
}