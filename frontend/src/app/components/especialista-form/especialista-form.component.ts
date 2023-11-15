import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Especialista } from 'src/app/models/especialista';
import { EspecialistaService } from 'src/app/services/especialista.service';

@Component({
  selector: 'app-especialista-form',
  templateUrl: './especialista-form.component.html',
  styleUrls: ['./especialista-form.component.css']
})
export class EspecialistaFormComponent implements OnInit {

  especialista = new Especialista();
  accion: string = "";

  constructor(private especialistaService: EspecialistaService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {

        if (params['id'] == '0') {
          this.accion = "new";
        } else {
          this.accion = "update";
          this.cargarEspecialista(params['id']);
        }
      }
    )
  }

  cargarEspecialista(id: string) {
    this.especialistaService.getEspecialista(id).subscribe(
      (result) => {
        Object.assign(this.especialista, result);
        //console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }

  guardarEspecialista() {
    //console.log(this.especialista);
    this.especialistaService.createEspecialista(this.especialista).subscribe(
      result => {
        if (result.status == 1) {
          this.toastr.success('Especialista agregado correctamente', 'Especialista Agregado')
          this.router.navigate(["especialista"])
        }
      },
      error => {
        this.toastr.error(error.msg)
      }
    )


  }


  modificarEspecialista() {
    console.log("Entrando a modificar paciente")
    this.especialistaService.editEspecialista(this.especialista).subscribe(
      result => {
        if (result.status == 1) {
          this.toastr.success('Especialista Modificado Correctamente', 'Especialista Modificado')
          this.router.navigate(["especialista"])
        }
      },
      error => {
        this.toastr.error(error.msg)
      }
    )
  }

  public cancelar() {
    this.router.navigate(["especialista"])
  }

}
