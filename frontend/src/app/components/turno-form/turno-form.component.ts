import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Especialista } from 'src/app/models/especialista';
import { Paciente } from 'src/app/models/paciente';
import { Turno } from 'src/app/models/turno';
import { EspecialistaService } from 'src/app/services/especialista.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turno-form',
  templateUrl: './turno-form.component.html',
  styleUrls: ['./turno-form.component.css']
})
export class TurnoFormComponent implements OnInit {
  turno: Turno;
  turnoGuardado!:boolean;
  fechaActual!: string | null;
  fechaBoolean:boolean=false;
  especialistas: Array<Especialista>;
  accion: string = "";
  pacientes: Array<Paciente>;
  cantidadTurnos!: number;
  lapso!: string;
  today=Date();
  constructor(private activatedRoute: ActivatedRoute,private pd: DatePipe, private router: Router, private turnoService: TurnoService,
    private especialistaService: EspecialistaService, private pacienteService: PacienteService, private toastr: ToastrService) {
    this.turno = new Turno();
    this.especialistas = new Array<Especialista>();
    this.pacientes = new Array<Paciente>();
    this.fechaActual = this.pd.transform(this.today, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    console.log(new Date().toISOString().split('T')[0]);
    this.activatedRoute.params.subscribe(
      params => {

        this.cargarEspecialistas();
        this.cargarPacientes();

        if (params['id'] == 0) {
          this.accion = "new";
          this.turno.estado = "libre";
        } else {
          this.accion = "update";
          this.cargarTurno(params['id']);
        }
      }
    )
  }


  cargarEspecialistas() {
    this.especialistaService.getEspecialistas().subscribe(
      result => {
        let unEspectador = new Especialista();
        result.forEach((element: any) => {
          Object.assign(unEspectador, element);
          //console.log(element);
          this.especialistas.push(unEspectador);
          unEspectador = new Especialista();
        });
      },
      error => {
        console.log(error);
      }
    )
  }

  cargarPacientes() {
    this.pacienteService.getPacientes().subscribe(
      result => {
        let unEspectador = new Paciente();
        result.forEach((element: any) => {
          Object.assign(unEspectador, element);
          //console.log(element);
          this.pacientes.push(unEspectador);
          unEspectador = new Paciente();
        });
      },
      error => {
        console.log(error);
      }
    )
  }
  comprobarFecha():boolean{
    if(this.fechaActual!=null){
    const fechaActualObj = new Date(this.fechaActual);
    const fechaIngresadaObj = new Date(this.turno.fecha);
    console.log(fechaActualObj + ' Actual')
    console.log(fechaIngresadaObj +  ' Ingresada')
    console.log("Estableci fechas")
    if (fechaIngresadaObj >= fechaActualObj) {
      console.log("Mayor")
      return true;
    } else {
      console.log("Menor")
      return false
    }
    }
    return false
  }
  cargarTurno(id: string) {
    this.turnoService.getTurno(id).subscribe(
      (result) => {
        Object.assign(this.turno, result); //en paciente va a tener null
        this.turno.especialista = this.especialistas.find((item) => (item._id == this.turno.especialista._id))!;
        this.turno.paciente = this.pacientes.find((item) => (item._id == this.turno.paciente?._id))!;
      },
      error => {
        console.log(error);
      }
    )
  }




  modificarTurno() {
    console.log(this.turno);
  if(this.comprobarFecha()){
    this.turnoService.editTurno(this.turno).subscribe(
      result => {
        console.log(result)
        if (result.status == 1) {
          this.toastr.success('Turno modificado correctamente', 'Turno Modificado')
          this.router.navigate(["turnos-disponibles"])
        }
      },
      error => {
        this.toastr.warning(error)
      }
    )
  }else{
      this.toastr.error('La fecha del turno no puede ser menor a la fecha actual')
    }
  }

  public cancelar() {
    this.router.navigate(["turnos-disponibles"]);
  }

  guardarTurno() {
    // Convert the initial hour from string to Date object
    const initialHour = new Date(`1970-01-01T${this.turno.hora}`);
    // Calculate the time interval in milliseconds based on the selected lapso
    const timeInterval = parseInt(this.lapso) * 60000;
        if(this.comprobarFecha()){
          let turnoGuardado = false;
      for (let i = 0; i < this.cantidadTurnos; i++) {
      if (i != 0) {
        const nextStartTime = new Date(initialHour.getTime() + i * timeInterval);
        const hourStr = nextStartTime.getHours().toString().padStart(2, '0');
        const minutesStr = nextStartTime.getMinutes().toString().padStart(2, '0');
        this.turno.hora = `${hourStr}:${minutesStr}`;
        console.log(this.turno.hora)
      }
     // console.log(this.turno);
      //console.log(this.comprobarFecha());
      console.log("Paso")
      this.turnoService.createTurno(this.turno).subscribe(
        result => {
          console.log(result.status)
          if (result.status == 1 && !turnoGuardado) {
            turnoGuardado = true;
            console.log(this.turnoGuardado);
            this.toastr.success('Turno agregado correctamente', `Turnos Creados ${this.cantidadTurnos}`)
            this.router.navigate(["turnos-disponibles"])
            //console.log("turno guardado"+i);
          // }else if(result.status == 3){
          //   this.turnoGuardado = false
          //   console.log(this.turnoGuardado);
          //   this.toastr.warning('Ya existe un turno en esa hora')
          }
        },
        error => {
          console.log(error)
          if(error.error.status === '3'){
            console.log(this.turnoGuardado);
            this.toastr.warning('Ya existe un turno en esa hora')
          }else{
          this.toastr.warning('No se pudo agregar el turno correctamente')
          }
        }
      )
    }
    }else{
      this.toastr.error("La fecha del turno no debe ser menor a la actual")
    }
  }
}

