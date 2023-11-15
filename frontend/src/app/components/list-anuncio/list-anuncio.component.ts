import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { observable } from 'rxjs';
import { Anuncio } from 'src/app/models/anuncio';
import { Recurso } from 'src/app/models/recurso';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-list-anuncio',
  templateUrl: './list-anuncio.component.html',
  styleUrls: ['./list-anuncio.component.css']
})
export class ListAnuncioComponent implements OnInit {
  ancuncios : Array<Anuncio>
  listRecurso: Array<Recurso>
  listRecrso!:Array<Recurso>
  anuncioEliminarTitulo!:string;
  anuncioEliminar!:string;
  searchText:string = ''
  constructor(private anuncioService:AnuncioService ,private route:Router,  private storageService: StorageService,private toastr:ToastrService ) { 
    this.ancuncios= new Array<Anuncio>()
    this.listRecurso= new Array<Recurso>()
  
  }

  ngOnInit(): void {
    this.getAnucios()

    }
     getAnucios(){
      this.anuncioService.getAnuncios().subscribe(
        result=>{
           console.log(result)
           this.ancuncios=result
           console.log(this.ancuncios)
           this.invertir(this.ancuncios)
        },
        error=>{
          console.log(error)
        }
      )
     }
     invertir(anuncio:  Array<Anuncio>){
          let ar = new Array<Anuncio>()
          for(let i = anuncio.length - 1, j=0 ;i >=0; i--,j++ ){
            ar[j] = anuncio[i] 
          }
        this.ancuncios= ar
     }
 public modificarAnuncio(id :string){
   this.route.navigate(['form-anuncio',id])
 }
 public eliminarAnuncio(id :string){
  this.listRecrso= new Array<Recurso>()
    this.anuncioService.getAnuncioId(id).subscribe(
      result=>{
  
         this.listRecrso=result.recursos
          for(let i= 0;i < this.listRecrso.length; i++){
            console.log(this.listRecrso[i])
             if(this.listRecrso[i].tipo != "url"){
               console.log(this.listRecrso[i].referencia)
              this.elimarArchivo(this.listRecrso[i].referencia)
             }
          }
        
      },
      error=>{
        console.log
      }
    )
     this.anuncioService.deleteAnuncio(id).subscribe(
      result=>{
        console.log(result)
        if (result.status == 1) {
          this.toastr.success('Anuncio eliminado correctamente','Anuncio Eliminado')

         this.getAnucios()
        }

      },
      error => {
        console.log(error);
      }
     )
 }

elimarArchivo(ref : string){
 //let ref ="archivo641234_function now() { [native code] }"
  this.storageService.eliminarArchivo(ref )
}

 clickRecurso(anuncio:Anuncio){
    this.listRecurso= anuncio.recursos
 }
 direcionar(){
  this.route.navigate(['form-anuncio/0'])
 }

modalEliminar(data:string){
  this.anuncioEliminar = data
}
  }
  


