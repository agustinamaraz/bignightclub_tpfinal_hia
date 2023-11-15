import { Recurso } from "./recurso"

export class Anuncio {
    _id !:string
    titulo !:string 
    descripcion!:string
    fechaDesde!: string
    fechaHasta!:string 
    estado!: string
    recursos!:Array<Recurso>
    constructor(){
        this.recursos= new Array<Recurso>()
    }
}