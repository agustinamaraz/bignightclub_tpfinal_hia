import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
//import { get } from 'http';
import { ToastrService } from 'ngx-toastr';
import { Contacto } from 'src/app/models/contacto';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-list-contacto',
  templateUrl: './list-contacto.component.html',
  styleUrls: ['./list-contacto.component.css']
})
export class ListContactoComponent implements OnInit {
  contactos:Array<Contacto>
  contactoEliminar!:string
  constructor(private contactoService:ContactoService , private route :Router, private toastr:ToastrService) { 
    this.contactos= new Array<Contacto>()
  }

  ngOnInit(): void {
    this.getContacto()
  }
  getContacto(){
    this.contactoService.getContactos().subscribe(
      resuls=>{
        console.log(resuls)
        this.contactos= resuls
        this.invertir(this.contactos)
      }
    )
  }
  invertir(contacto:  Array<Contacto>){
    let ar = new Array<Contacto>()
    for(let i = contacto.length - 1, j=0 ;i >=0; i--,j++ ){
      ar[j] = contacto[i] 
    }
  this.contactos= ar
}
modificarContacto(id: string){
  this.route.navigate(['formcontacto',id])
}
eliminarContacto(id:string){
this.contactoService.deleteContacto(id).subscribe(
  result=>{
    if(result.status == 1){
      this.toastr.warning('Paciente eliminado correctamente','Paciente Eliminado')
      window.location.reload();
    }
  }
)
}
agregarContacto(){
  this.route.navigate(['formcontacto/0'])
}
modalEliminar(data:string){
  this.contactoEliminar = data
}
} 
