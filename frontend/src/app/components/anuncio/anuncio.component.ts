import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { Anuncio } from 'src/app/models/anuncio';
import { AnuncioService } from 'src/app/services/anuncio.service';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent implements OnInit {
  anuncio:Anuncio
  pdfSrc = "https://www.uv.mx/pozarica/caa-conta/files/2016/02/REGULAR-AND-IRREGULAR-VERBS.pdf";
  constructor(private anuncioService: AnuncioService,private route :Router,private activatedRoute: ActivatedRoute) {
    this.anuncio= new Anuncio()
   
   }

  ngOnInit(): void { 
   this.activatedRoute.params.subscribe(params=>{
 if(params['id']!='0'){
   this.getAnuncio(params['id'])
 }

   })
  }
  getAnuncio(id:string){
    this.anuncioService.getAnuncioId(id).subscribe(
      result=>{
           this.anuncio=result
           console.log(this.anuncio)
           
      },
       error=>{
        console.log(error)
       }
    )

  }
}
