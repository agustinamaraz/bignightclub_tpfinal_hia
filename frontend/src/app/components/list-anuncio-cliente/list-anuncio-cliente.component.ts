import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { error } from 'console';
import { Anuncio } from 'src/app/models/anuncio';
import { Recurso } from 'src/app/models/recurso';
import { AnuncioService } from 'src/app/services/anuncio.service';

@Component({
  selector: 'app-list-anuncio-cliente',
  templateUrl: './list-anuncio-cliente.component.html',
  styleUrls: ['./list-anuncio-cliente.component.css']
})
export class ListAnuncioClienteComponent implements OnInit {
  anuncio: Anuncio
  anuncios: Array<Anuncio>
  recurso: Recurso
  recurso2!: Array<Recurso>
  ListR: Array<Recurso>
  l: Number
  //urlR:string
  fecha: string
  valor: string
  rec: string
  today = new Date()

  hayAnuncios!: boolean;

  constructor(private anuncioServcice: AnuncioService, private pd: DatePipe, private route: Router) {
    this.anuncio = new Anuncio()
    this.anuncios = new Array<Anuncio>()
    this.fecha = ""
    this.recurso = new Recurso()
    //this.urlR=""
    this.ListR = new Array<Recurso>()
    this.l = 0
    this.valor = "nulo"
    this.rec = "no"
    ///this.recurso2=new Array<Recurso>()
  }

  ngOnInit(): void {
    this.anuncioServcice.getAnuncios().subscribe(
      result => {
        if (result.length == 0) {
          this.hayAnuncios = false;
        } else {
          this.hayAnuncios=true;
          let i = result.length - 1
          this.anuncio = result[i];

          if (this.anuncio.recursos[0] != null) {
            for (let j = 0; j < this.anuncio.recursos.length; j++) {
              if (this.anuncio.recursos[j].tipo == "imagen") {
                this.recurso = this.anuncio.recursos[j]
                this.rec = "yes"
              }
              if (this.anuncio.recursos[j].tipo == "video") {
                this.recurso = this.anuncio.recursos[j]
                this.rec = "yes"
              }
            }
            this.valor = "no"
          }
        }


      }
    )

    if (this.hayAnuncios == true) {
      this.fecha = this.pd.transform(this.today, "yyyy-MM-dd")!
      console.log(this.fecha)
      this.anuncioServcice.getFechaAnuncios(this.fecha).subscribe(
        resul => {
          console.log(resul)
          this.anuncios = resul
          this.invertir(this.anuncios)

          for (let i = 0; i > this.anuncios.length; i++) {
            if (this.anuncios[i].recursos != null) {
              for (let j = 0; j > this.anuncios[i].recursos.length; j++) {

                if (this.anuncios[i].recursos[j].tipo == "imagen") {
                  this.anuncios[i].recursos[0] = this.anuncios[i].recursos[j]
                }
                else {
                  if (this.anuncios[i].recursos[j].tipo === "video") {
                    this.anuncios[i].recursos[0] = this.anuncios[i].recursos[j]
                  }
                }
              }
            }


          }

        },
        error => {
          console.log(error)
        }
      )
    }



  }
  buscar(tipo: string): Boolean {
    if (tipo == "video") {
      return true
    }

    if (tipo == "imagen") {
      return true
    }

    return false
  }
  invertir(anuncio: Array<Anuncio>) {
    let ar = new Array<Anuncio>()
    for (let i = anuncio.length - 1, j = 0; i >= 0; i--, j++) {
      ar[j] = anuncio[i]
    }
    this.anuncios = ar
  }
  verAnuncion(id: string) {
    this.route.navigate(['anuncio', id])
  }
  verAnuncion1() {
    this.route.navigate(['anuncio', this.anuncio._id])
  }
}
