import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as printJS from 'print-js';
import { Especialista } from 'src/app/models/especialista';
import { EspecialistaService } from 'src/app/services/especialista.service';
import * as XLSX from 'xlsx';
import * as  ExcelJS from 'exceljs';

@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.component.html',
  styleUrls: ['./especialista.component.css']
})
export class EspecialistaComponent implements OnInit {
  especialistas: Array<Especialista>;
  especialistasDNI: Array<Especialista>;
  especialistaA: Array<Especialista>;
  especialistaN: Array<Especialista>;
  especialistaEliminar:Especialista
  dni!: string;
  especialistaFiltro: Array<Especialista>;
  filtro!: boolean;
  click!:boolean;
  nombre!: string;
  apellido!: string;
  constructor(private especialistaService: EspecialistaService, private router: Router, private toastr: ToastrService) {
    this.especialistas = new Array<Especialista>();
    this.especialistaEliminar = new Especialista();
    this.especialistasDNI = new Array<Especialista>();
    this.especialistaA = new Array<Especialista>();
    this.especialistaN = new Array<Especialista>();
    this.especialistaFiltro = new Array<Especialista>();
    this.obtenerEspecialistas();
  }

  ngOnInit(): void {
  }
  obtenerEspecialistas() {
    this.especialistaService.getEspecialistas().subscribe(
      result => {
        let e = new Especialista();
        result.forEach((element: any) => {
          Object.assign(e, element);
          this.especialistas.push(e);
          e = new Especialista();
        });
      },
      error => {
        console.log(error);
      }
    )
  }


  obtenerEspecialistaPorDNI() {
     this.especialistas = new Array<Especialista>();
    console.log("ENTRANDO A especialista POR DNI");
    this.especialistaService.getEspecialistaPorDNI(this.dni).subscribe(
      (result: any) => {
        this.especialistas = new Array<Especialista>();
        //this.especialistasDNI = result;
        result.forEach((element: any) => {
          let e = new Especialista();
          Object.assign(e, element);
          this.especialistas.push(e);
          e = new Especialista();
        });
        console.log("SALIENDO  DE   especialista POR DNI");
      },
      error => {
        this.toastr.warning('Error al buscar especialista por dni', 'Error')
      }
    )
  }

 
  obtenerEspecialistaA() {
    console.log("ENTRANDO A PACIENTE POR APELLIDO");
    this.especialistas = new Array<Especialista>();
     this.especialistaService.getEspecialistaA(this.apellido).subscribe(
       (result: any) => {
        this.especialistas = new Array<Especialista>();
         //this.especialistas = result;
           console.log(result)
          result.forEach((element: any) => {
          let unEspecialista = new Especialista();
           Object.assign(unEspecialista, element);
           this.especialistas.push(unEspecialista);
         });
         console.log("SALIENDO  DE   especialista POR APELLIDO");
       },
       error => {
         this.toastr.warning('Error al buscar paciente por apellido', 'Error')
       }
     )
    
   }
 
   obtenerEspecialistaN() {
       console.log("ENTRANDO A PACIENTE POR NOMBRE");
     this.especialistas = new Array<Especialista>();
     this.especialistaService.getEspecialistaN(this.nombre).subscribe(
       (result: any) => {
        this.especialistas = new Array<Especialista>();
         //this.especialistaN = result;
         result.forEach((element: any) => {
          let unEspecialista = new Especialista();
           Object.assign(unEspecialista, element);
           this.especialistas.push(unEspecialista);
         });
         console.log("SALIENDO  DE   especialista POR NOMBRE");
       },
       error => {
         this.toastr.warning('Error al buscar paciente por nombre', 'Error')
       }
     )
   }


  eliminarEspecialista(e: Especialista) {
    this.especialistaService.deleteEspecialista(e._id).subscribe(
      result => {
        if (result.status == 1) {
          this.toastr.success('Especialista eliminado correctamente', 'Especialista Eliminado')
          window.location.reload();
        }
      },
      error => {
        alert(error.msg);
      }
    )
  }

  modificarEspecialista(e: Especialista) {
    this.router.navigate(["especialista-form", e._id])
  }

  agregarEspecialista() {
    this.router.navigate(["especialista-form", 0])
  }

  imprimirPdf() {
    printJS({
      printable: this.especialistas,
      properties: [
        { field: 'nombre', displayName: 'Nombre' },
        { field: 'apellido', displayName: 'Apellido' },
        { field: 'profesion', displayName: 'Profesión/Cargo' },
        { field: 'dni', displayName: 'DNI' }
      ],
      type: 'json',
      header: `<h2 class="print-header">Especialistas Registrados</h2> <hr/>`,
      style: `
      .print-header{
        text-align: center;
        color:withe;
        font-weight: bold;
        background-color:lightblue;
        padding: 10px 0;
        margin:0;
      }
      table{
        width:100%;
        text-align: center;
      }
      th, td{
        padding:8px;
      }
      th{
        background-color:lightgray;
        color:white;
      }` ,
    })
  }

  imprimirXlsx(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.especialistas)//definimos hojas de trabajo y le asignamos los pacientes
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Especialistas Registrados`) //nombre de la hoja de excel
    XLSX.writeFile(workbook, `ListadoEspecialistas.xlsx`);

  }

  generarExcel(especialista: Especialista) {
    console.log('entrando a generar excel')
    const workbook = new ExcelJS.Workbook(); //creamos una nueva hojja 
    const create = workbook.creator = ('Centro de Salud Huaicos') //agregamos el autor del excel
    const worksheet = workbook.addWorksheet('Listado de Especialistas') //nombre del excel

    //agregar datos al archivo de excel
    worksheet.addRow(['DNI', 'Nombre', 'Apellido', 'Profesión']);
    worksheet.addRow([especialista.dni, especialista.nombre, especialista.apellido, especialista.profesion]);
  }
  modalEliminar(data:Especialista){
    this.especialistaEliminar = data;
  }
}
