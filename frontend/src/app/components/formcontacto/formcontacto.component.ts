import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Contacto } from 'src/app/models/contacto';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-formcontacto',
  templateUrl: './formcontacto.component.html',
  styleUrls: ['./formcontacto.component.css']
})
export class FormcontactoComponent implements OnInit {
  contacto:Contacto
  accion:string
  tipo!:string
  id!:string
  constructor(private contactoService: ContactoService,private route :Router,private activatedRoute: ActivatedRoute,private toastr:ToastrService) { 
    this.contacto = new Contacto()
    this.accion = ""

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params=>{
        if(params['id']=='0'){
            this.accion="new"
         }
         else{
          this.accion = "update"
         this.ObtenerContacto(params['id'])
         this.id=params['id']
         }
      }
    )
  }
  ObtenerContacto(id:string){
    this.contactoService.getContacto(id).subscribe(
      result=>{
        this.contacto= result
        console.log(this.contacto)
      },
      error=>{
        console.log(error)
      }
    )
  }
  tipoContacto(){
    if(this.contacto.tipo == "telefono"){
     this.tipo = "telefono"
    }
    if(this.contacto.tipo == "celular"){
      this.tipo = "celular"
    }
    if(this.contacto.tipo == "gmail"){
      this.tipo="gmail"
    }
  }
  guardarContato(){
   if(this.validarContacto()){
     this.contactoService.createContacto(this.contacto).subscribe(
      result=>{
        console.log(result);
        if (result.status == 1) {
       
          this.toastr.success('Contacto agregado correctamente','Contacto Agregado')
          this.route.navigate(["list-contacto"])
            
        }
      },
      error=>{
        console.log(error)
      }
     )
   }
  }
  modificarContacto(){
     if(this.validarContacto()){
       this.contactoService.editContacto(this.contacto,this.id).subscribe(
        result=>{
          if (result.status == 1) {
            this.toastr.success('Contacto Modificado Correctamente')
            this.route.navigate(["list-contacto"])
          }
        },
        error=>{
          console.log(error)
        }
       )
     }
  }
  cancelar(){
    this.route.navigate(['list-contacto'])
  }
  validarContacto():boolean{
    if(this.contacto.descripcion == null){
      this.toastr.error("Ingrese Descripcion")
      return false
    }
    if(this.contacto.tipo == null){
      this.toastr.error("Elija un contacto")
       return false
     }
     if(this.contacto.valor == null){
      this.toastr.error("Ingrese un valor")
      
      return false
     }
     return true;
  }
}
