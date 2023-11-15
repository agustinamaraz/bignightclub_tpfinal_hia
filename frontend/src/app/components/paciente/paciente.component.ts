import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/paciente.service';
import * as printJS from 'print-js'; //print en pdf
import * as XLSX from 'xlsx';
import * as  ExcelJS from 'exceljs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  pacientes: Array<Paciente>;
  pacientesAux: Array<Paciente>;
  tipoArchivo!:string;
  pacientesHombreOtro: Array<Paciente>;
  pacientesMujer: Array<Paciente>;
  pacienteDni: Array<Paciente>;
  pacienteA: Array<Paciente>;
  pacienteN: Array<Paciente>;
  dni!: string;
  dato!: string;
  pacienteFiltro: Array<Paciente>;
  filtro!: boolean;
  click!:boolean;
  nombre!: string;
  apellido!: string;
  fecha!:string;
  //dtOptions : DataTables.Settings = {}; 
  //dtTrigger =new Subject<any>();
  choseMujer:boolean=false;
  choseHombreOtro:boolean=false;
  choseGeneral:boolean=false;
  pacienteElminar:Paciente

  constructor(private pacienteService: PacienteService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService) {
    this.pacientes = new Array<Paciente>();
    this.pacientesAux = new Array<Paciente>();
    this.pacientesHombreOtro = new Array<Paciente>();
    this.pacientesMujer = new Array<Paciente>();
    this.pacienteDni = new Array<Paciente>();
    this.pacienteN = new Array<Paciente>();
    this.pacienteA = new Array<Paciente>();
    this.pacienteFiltro = new Array<Paciente>();
    this.pacienteElminar = new Paciente();
    this.obtenerPacientes();
    this.fecha = String(new Date().toLocaleDateString('es-ar'));
  }

  ngOnInit(): void {
    /*this.dtOptions={
      pagingType :'full_pages',
      pageLength: 5,
    },
    this.obtenerPacientes();*/
  }

  /*ngOnDestroy():void{
     this.dtTrigger.unsubscribe();
 }*/
filterGender(){
  this.pacientesHombreOtro = this.pacientes.filter(d => d.genero === "Hombre" || d.genero === "Otro");
  this.pacientesMujer = this.pacientes.filter(d => d.genero === "Mujer");
}
excelTableGeneral() {
  this.choseGeneral = true;
  this.tipoArchivo = 'General'
  this.imprimirXlsx()
}
excelTableHombreOtro() {
  this.choseHombreOtro = true;
  this.tipoArchivo = 'Hombre_u_Otro'
  this.imprimirXlsx()
}
excelTableMujeres() {
  this.choseMujer = true;
  this.tipoArchivo = 'Mujeres'
  this.imprimirXlsx()
}
pdfGeneral(){
  this.choseGeneral = true
  this.tipoArchivo = 'General'
  this.imprimirPdf();
}
pdfHombreOtro(){
  this.choseHombreOtro = true
  this.tipoArchivo = 'Hombre_u_Otro'
  this.imprimirPdf();
}
pdfMujeres(){
  this.choseMujer = true;
  this.tipoArchivo = 'Mujeres'
  this.imprimirPdf();
}
imprimirPdf() {
  if(this.choseMujer){
    this.pacientesAux = this.pacientesMujer;
  }else if(this.choseHombreOtro){
    this.pacientesAux = this.pacientesHombreOtro;
  }else if(this.choseGeneral){
    this.pacientesAux = this.pacientes
  }
    printJS({
      printable: this.pacientesAux,
      properties: [
        { field: 'dni', displayName: 'DNI' },
        { field: 'nombre', displayName: 'Nombre' },
        { field: 'apellido', displayName: 'Apellido' },
        { field: 'fechaNac', displayName: 'Fecha de Nacimiento' },
        {field: 'genero', displayName:'Genero'}
      ],
      type: 'json',
      header: `<h2 class="print-header">Pacientes ${this.tipoArchivo} Registrados dia ${this.fecha}</h2> <hr/>`,
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
    this.choseGeneral = false;
    this.choseHombreOtro = false;
    this.choseMujer = false;
  }
  imprimirXlsx():void{
    if(this.choseMujer){
      this.pacientesAux = this.pacientesMujer;
    }else if(this.choseHombreOtro){
      this.pacientesAux = this.pacientesHombreOtro;
    }else if(this.choseGeneral){
      this.pacientesAux = this.pacientes
    }
    const worksheet= XLSX.utils.json_to_sheet(this.pacientesAux)//definimos hojas de trabajo y le asignamos los pacientes
    const workbook =XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Pacientes Registrados`) //nombre de la hoja de excel
    XLSX.writeFile(workbook, `ListaPacientes_${this.fecha}_${this.tipoArchivo}.xlsx`);
    this.choseGeneral = false;
    this.choseHombreOtro = false;
    this.choseMujer = false;
  }

  obtenerPacientes() {
    console.log("entrando a obtener pacientes")
    this.pacienteService.getPacientes().subscribe(
      result => {
        let unPaciente = new Paciente();
        result.forEach((element: any) => {
          Object.assign(unPaciente, element);
          this.pacientes.push(unPaciente);
          unPaciente = new Paciente();
        });
        this.filterGender()
      },
      error => {
        console.log(error);
      }
    )
  }


  obtenerPacienteDni() {
    console.log("ENTRANDO A PACIENTE POR DNI");
    this.pacientes = new Array<Paciente>();
    this.pacienteService.getPacienteDni(this.dni).subscribe(
      (result: any) => {
        this.pacientes = new Array<Paciente>();
        //this.pacienteDni = result;
        result.forEach((element: any) => {
          let unPaciente = new Paciente();
          Object.assign(unPaciente, element);
          this.pacientes.push(unPaciente);
          unPaciente = new Paciente();
        });
      },
      error => {
        this.toastr.warning('Error al buscar paciente por dni', 'Error')
      }
    )
  }

  obtenerPacienteA() {
   console.log("ENTRANDO A PACIENTE POR NOMBRE");
    this.pacientes = new Array<Paciente>();
    this.pacienteService.getPacienteA(this.apellido).subscribe(
      (result: any) => {
        this.pacientes = new Array<Paciente>();
       // this.pacienteA = result;

        result.forEach((element: any) => {
          let unPaciente = new Paciente();
          Object.assign(unPaciente, element);
          this.pacientes.push(unPaciente);
          unPaciente = new Paciente();
        });
      },
      error => {
        this.toastr.warning('Error al buscar paciente por apellido', 'Error')
      }
    )
  }

  obtenerPacienteN() {

      console.log("ENTRANDO A PACIENTE POR NOMBRE");
    this.pacientes = new Array<Paciente>();
    this.pacienteService.getPacienteN(this.nombre).subscribe(
      (result: any) => {
        this.pacientes = new Array<Paciente>();
        //this.pacienteN = result;

        result.forEach((element: any) => {
          let unPaciente = new Paciente();
          Object.assign(unPaciente, element);
          this.pacientes.push(unPaciente);
          unPaciente = new Paciente();
        });
      },
      error => {
        this.toastr.warning('Error al buscar paciente por nombre', 'Error')
      }
    )
  }

  eliminarPaciente(paciente: Paciente) {
    this.pacienteService.deletePaciente(paciente._id).subscribe(
      result => {
        if (result.status == 1) {
          this.toastr.success('Paciente eliminado correctamente', 'Paciente Eliminado')
          window.location.reload();
        }
      },
      error => {
        this.toastr.warning('Error al buscar paciente por dni', 'Error')
      }
    )
  }

  modificarPaciente(paciente: Paciente) {
    console.log(paciente);
    this.router.navigate(["paciente-form", paciente._id])
  }

  agregarPaciente() {
    this.router.navigate(["paciente-form", 0])
  }
  verControl(paciente: Paciente) {
    this.router.navigate(['datosMedicosHome', paciente.dni])
  }
  generarExcel(paciente: Paciente) {
    console.log('entrando a generar excel')
    const workbook = new ExcelJS.Workbook(); //creamos una nueva hojja 
    const create = workbook.creator = ('Centro de Salud Huaicos') //agregamos el autor del excel
    const worksheet = workbook.addWorksheet('Listado de Pacientes') //nombre del excel

    //agregar datos al archivo de excel
    worksheet.addRow(['DNI', 'Nombre', 'Apellido', 'Fecha de Nacimiento']);
    worksheet.addRow([paciente.dni, paciente.nombre, paciente.apellido, paciente.fechaNac]);
  }
  modalEliminar(data:Paciente){
    this.pacienteElminar = data;
  }
}