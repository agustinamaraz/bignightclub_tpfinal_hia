import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from 'src/app/models/paciente';
import { Turno } from 'src/app/models/turno';
import { LoginService } from 'src/app/services/login.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turnos-disponibles',
  templateUrl: './turnos-disponibles.component.html',
  styleUrls: ['./turnos-disponibles.component.css']
})
export class TurnosDisponiblesComponent implements OnInit {
  turnos: Array<Turno>;
  turno: Turno = new Turno();
  hayTurnos: boolean = true;
  misTurnos: Array<Turno>;
  tengoTurnos: boolean = true;

  constructor(private router: Router, private turnoService: TurnoService, private loginService: LoginService, private pacienteService: PacienteService, private toastr: ToastrService) {

    this.turnos = new Array<Turno>();
    this.misTurnos = new Array<Turno>();

    this.obtenerTurnos();
    this.obtenerMisTurnos();
  }

  ngOnInit(): void { }

  obtenerTurnos() {
    this.turnoService.getTurnosDisponibles().subscribe(
      result => {
        //console.log(result);
        if (result.length == 0) {
          this.hayTurnos = false;
        } else {
          let unTicket = new Turno();
          result.forEach((element: any) => {
            Object.assign(unTicket, element);
            this.turnos.push(unTicket);
            unTicket = new Turno();
          });
        }
      },
      error => {
        this.toastr.warning(error)

      }
    );
  }

  eliminarTurno(turno: Turno) {
    this.turnoService.deleteTurno(turno._id).subscribe(
      result => {
        if (result.status == 1) {

          this.toastr.success('Turno eliminado correctamente', 'Turno Eliminado')

          //setTimeout(function () {
          window.location.reload();
          //}, 2000); // 3000 representa el tiempo en milisegundos (3 segundos)
        }
      },
      error => {
        this.toastr.warning(error)
      }
    );
  }

  modificarTurno(turno: Turno) {
    this.router.navigate(['turno-form', turno._id]);
  }

  async reservarTurno(turno: Turno) {
    this.turno = turno;

    console.log("TURNO INICIAL:", this.turno)
    const pacienteString = this.loginService.getUser();

    let paciente = null;

    if (pacienteString !== null) {
      paciente = JSON.parse(pacienteString);
    }

    console.log("PACIENTE en sesion:", paciente)

    try {
      const result: any = await this.pacienteService.getPacienteDni(paciente.usuario.dni).toPromise();

      const pacienteAgregar = result["0"];
      console.log(pacienteAgregar)
      if (pacienteAgregar != null) {
        this.turno.estado = "reservado";
        this.turno.paciente = pacienteAgregar;
        console.log(this.turno.paciente, this.turno.estado)
        this.turnoService.editTurno(this.turno).subscribe(
          result => {
            if (result.status == 1) {
              this.toastr.success('Turno reservado correctamente', 'Turno reservado')
              setTimeout(() => {
                window.location.reload();
              }, 3000)
            }
          },
          error => {
            if (error.status === 400) {
              this.toastr.warning('Usted ya reservo un turno para ese especialista en esa fecha')
              setTimeout(() => {
                window.location.reload();
              }, 3000)
            } else {
              this.toastr.warning('No se pudo reservar el turno')
            }
          }
        )
      }

    } catch (error) {
      console.error("Error al obtener los datos del paciente:", error);
      throw error;
    }
  }

  obtenerMisTurnos() {
    if (this.esAdministrador() != true) {
      this.misTurnos = new Array<Turno>();
      const pacienteString = this.loginService.getUser();
      let paciente = null;

      if (pacienteString !== null) {
        paciente = JSON.parse(pacienteString);
      }

      console.log(paciente.usuario.dni)


      this.turnoService.getMisTurnos(paciente.usuario.dni).subscribe(
        (result) => {

          if (result.length == 0) {
            this.tengoTurnos = false;
          } else {
            let unTurno = new Turno();

            result.forEach((element: any) => {

              if (element.paciente != null) {
                Object.assign(unTurno, element);
                this.misTurnos.push(unTurno);
                unTurno = new Turno();
              }

            });
          }

        },
        (error: any) => {
          console.log("error en el service: ", error);
        }
      )
    }

  }

  darDeAltaTurnos() {
    this.router.navigate(["/turno-form", 0])
  }

  esAdministrador() {
    return this.loginService.esAdmin();
  }

}
