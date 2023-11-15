import { Component, OnInit } from '@angular/core';
//import { error } from 'console';
import { Contacto } from 'src/app/models/contacto';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  contactos:Array<Contacto>
  constructor(private contactoService:ContactoService) { 
    this.contactos= new Array<Contacto>()
  }

  ngOnInit(): void {
    this.contactoService.getContactos().subscribe(
      result=>{
        console.log(result)
        this.contactos=result
      },
      error=>{
        console.log(error)      }
      
    )
  }

}
