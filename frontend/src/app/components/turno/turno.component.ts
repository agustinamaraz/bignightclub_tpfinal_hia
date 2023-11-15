import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { concatAll } from 'rxjs';
import { Turno } from 'src/app/models/turno';
import { LoginService } from 'src/app/services/login.service';
import { TurnoService } from 'src/app/services/turno.service';


@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements OnInit {
  turnos: Array<Turno>;
  pacienteService: any;
  turnoEliminar:Turno;
  searchText = '';
  hayTurnos: boolean = true;

  constructor(private router: Router, private turnoService: TurnoService, private loginService: LoginService, private toastr: ToastrService) {
    this.turnos = new Array<Turno>();
    this.obtenerTurnos();
    this.turnoEliminar = new Turno();
  }

  ngOnInit(): void {
  }

  obtenerTurnos() {
    let contarTurnosSinPacientes = 0;
    this.turnos = new Array<Turno>();

    this.turnoService.getTurnos().subscribe(
      result => {
        console.log(result);

        

        let unTurno = new Turno();

        result.forEach((element: any) => {

          if (element.paciente != null) {
            Object.assign(unTurno, element);
            this.turnos.push(unTurno);
            unTurno = new Turno();
          }else{
            contarTurnosSinPacientes++;
          }

        });

        if(contarTurnosSinPacientes == result.length){
          this.hayTurnos=false;
        }

      },
      error => {
        console.log(error);
      }
    )
  }

  eliminarTurno(ticket: Turno) {
    this.turnoService.deleteTurno(ticket._id).subscribe(
      result => {
        if (result.status == 1) {
          this.toastr.success('Turno eliminado correctamente', 'Turno Eliminado')
          window.location.reload();
        }
      },
      error => {
        alert(error.msg);
      }
    )
  }

  modificarTurno(ticket: Turno) {
    this.router.navigate(["turno-form", ticket._id])
  }

  esAdministrador() {
    return this.loginService.esAdmin();
  }
  modalEliminar(data:Turno){
    this.turnoEliminar = data
  }

}
