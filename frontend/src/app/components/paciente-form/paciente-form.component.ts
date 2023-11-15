import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css'],
})
export class PacienteFormComponent implements OnInit {
  fechaActual!: string | null;
  fechaBoolean: boolean = false;
  paciente = new Paciente();
  accion: string = '';
  today = Date();
  constructor(
    private pacienteService: PacienteService,
    private pd: DatePipe,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.fechaActual = this.pd.transform(this.today, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] == '0') {
        this.accion = 'new';
      } else {
        this.accion = 'update';
        this.cargarPaciente(params['id']);
      }
    });
  }

  comprobarFecha(): boolean {
    if (this.fechaActual != null) {
      const fechaActualObj = new Date(this.fechaActual);
      const fechaIngresadaObj = new Date(this.paciente.fechaNac);
      console.log('Estableci fechas');
      console.log('fecha actual' + fechaActualObj);
      console.log('Fechanac' + fechaIngresadaObj);
      if (fechaIngresadaObj <= fechaActualObj) {
        console.log('Mayor');
        this.fechaBoolean = true;
        return true;
      } else {
        console.log('Menor');
        this.fechaBoolean = false;
        return false;
      }
    }
    return false
  }

  cargarPaciente(id: string) {
    this.pacienteService.getPaciente(id).subscribe(
      (result) => {
        Object.assign(this.paciente, result);
        console.log(result);
      },
      (error) => {
        if (error.error.status) {
          this.toastr.error('Ya existe un paciente con ese dni');
        }
        console.log(error);
      }
    );
  }

  guardarPaciente() {
    console.log(this.paciente);
    this.comprobarFecha();
    console.log(this.comprobarFecha());
    if (this.fechaBoolean) {
      this.pacienteService.createPaciente(this.paciente).subscribe(
        (result) => {
          if (result.status == 1) {
            this.toastr.success(
              'Paciente agregado correctamente',
              'Paciente Agregado'
            );
            this.router.navigate(['paciente']);
          }
        },
        (error) => {
          if (error.status === 449) {
            this.toastr.error('Ya existe un paciente con ese dni');
            this.paciente.dni = '';
          } else {
            this.toastr.error('Debe completar todos los campos');
          }
        }
      );
    } else {
      this.toastr.error(
        'La fecha de nacimiento no puede ser mayor a la fecha actual'
      );
    }
  }

  modificarPaciente() {
    console.log('Entrando a modificar paciente');
    this.comprobarFecha();
    console.log(this.comprobarFecha());
    if (this.fechaBoolean) {
      this.pacienteService.editPaciente(this.paciente).subscribe(
        (result) => {
          if (result.status == 1) {
            this.toastr.success(
              'Paciente Modificado Correctamente',
              'Paciente Modificado'
            );
            this.router.navigate(['paciente']);
          }
        },
        (error) => {
          if (error.status === 449) {
            this.toastr.error('Ya existe un paciente con ese dni');
            this.paciente.dni = '';
          } else {
            this.toastr.error(error.msg);
          }
        }
      );
    } else {
      this.toastr.error(
        'La fecha de nacimiento no puede ser mayor a la fecha actual'
      );
    }
  }

  public cancelar() {
    this.router.navigate(['paciente']);
  }
}
