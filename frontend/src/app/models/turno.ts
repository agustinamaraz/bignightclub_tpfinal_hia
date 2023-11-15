import { Especialista } from "./especialista";
import { Paciente } from "./paciente";

export class Turno {
    _id!: string;
    fecha!:string;
    cantidadTurnos!:number;
    hora!:string;
    lapso!:string;
    paciente: Paciente | null = null;
    especialista: Especialista=new Especialista();
    estado!:string;
    centroSalud!: string;
}
