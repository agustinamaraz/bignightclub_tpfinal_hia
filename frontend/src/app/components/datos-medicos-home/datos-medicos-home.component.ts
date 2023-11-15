import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosMedicos } from 'src/app/models/datos-medicos';
import { Paciente } from 'src/app/models/paciente';
import { DatosMedicosServiceService } from 'src/app/services/datos-medicos-service.service';
import { PacienteService } from 'src/app/services/paciente.service';
import * as ExcelJS from 'exceljs';
import * as printJS from 'print-js';

@Component({
  selector: 'app-datos-medicos-home',
  templateUrl: './datos-medicos-home.component.html',
  styleUrls: ['./datos-medicos-home.component.css']
})
export class DatosMedicosHomeComponent implements OnInit {
  
  datosMedicos!:Array<DatosMedicos>;
  datosMedicosAux!:Array<DatosMedicos>;
  datoMedicoReciente!:DatosMedicos;
  datoMedicoVer!:DatosMedicos
  datoMed!:DatosMedicos;
  pacienteBuscado!:Paciente;
  noData:boolean=false;
  noPatient:boolean=false;
  moreThan1:boolean=true;
  choseOther:boolean=false;
  fecha!:string;
  id!:string;
  gender:boolean=false;
  searchText = '';
  isInitialized: boolean = false;
  constructor(private datosMedicosService:DatosMedicosServiceService, private activatedRoute:ActivatedRoute,
    private pacienteService:PacienteService,
    private route:Router) {
      this.pacienteBuscado = new Paciente();
      this.datosMedicos=new Array<DatosMedicos>();
      this.datosMedicosAux=new Array<DatosMedicos>();
      this.datoMedicoReciente = new DatosMedicos();
      this.datoMedicoVer = new DatosMedicos();
      this.fecha = String(new Date().toLocaleDateString('es-ar'));
      window.scrollTo(0, 0);
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
        this.id = params['dni'];
        this.searchData(this.id)
    });
  }
  searchData(id:string){
    console.log(this.id + ' En search datas')
    this.pacienteService.getOnePacienteByDni(id).subscribe(
      result=>{
        console.log(result);
        this.pacienteBuscado = result;
        if(result===null){
          this.noPatient=true
        }
        if(result.genero === 'Mujer'){
          this.gender = true;
        }else{
          this.gender = false
        }
        this.getDatosMedicosDni();
      },
      error=>{
        console.log(error)
      }
    )
  }
  getDatosMedicosDni(){
    console.log(this.pacienteBuscado.dni)
    this.datosMedicosService.getDatosMedicosDNI(this.pacienteBuscado.dni).subscribe(
      result=>{
        if(result.length===0){
          this.noData=true;
        }
        else{
        if(result.length === 1){
          this.moreThan1=false
        }
        console.log(result)
        for(let i=0; i<result.length;i++){
          var nuevo = new DatosMedicos();
            nuevo.idDatoMedico = result[i]._id;
            nuevo.motivo = result[i].motivo;
            nuevo.paciente = result[i].paciente._id;
            nuevo.fecha = result[i].fecha;
            nuevo.peso = result[i].peso;
            nuevo.imc = result[i].imc;
            nuevo.talla = result[i].talla;
            nuevo.tension_arterial = result[i].tension_arterial;
            nuevo.diagnostico = result[i].diagnostico;
            nuevo.temperatura = result[i].temperatura;
            nuevo.fechaMenstruacion = result[i].fechaMenstruacion;
            nuevo.centroSalud = result[i].centroSalud;
            nuevo.pacienteObj = result[i].paciente;
        this.datosMedicos.push(nuevo)
        console.log(nuevo.pacienteObj.nombre + ' NOmbre '+ result[i].paciente.nombre)
        }
        console.log(this.datosMedicos[0].pacienteObj.nombre)
        if (!this.isInitialized) {
          this.getDatoMedicoReciente();
          this.isInitialized = true; // Marcar como inicializado para que no se vuelva a ejecutar
        }
      }
      },
      error=>{
        console.log(error)
      }
    )
  }
  getDatoMedicoReciente(){
    this.datoMedicoReciente = this.datosMedicos.reduce((datoMedicoActual, datoMedico) => {
      const fechaActual = new Date(datoMedicoActual.fecha);
      const fechaDatoMedico = new Date(datoMedico.fecha);
    
      if (fechaDatoMedico > fechaActual) {
        return datoMedico;
      } else {
        return datoMedicoActual;
      }
    });
    this.datosMedicosAux = this.datosMedicos.filter((datoMedico) => {
      return datoMedico !== this.datoMedicoReciente;
    });
    this.datoMedicoVer = this.datoMedicoReciente;
  }
  seeData(data:DatosMedicos){
    this.datoMedicoVer = data
    this.choseOther = true
  }
  
  imprimirPdf(){
    printJS({
      printable: this.datosMedicos, 
      properties: [
        {field:'pacienteObj.dni',displayName:'DNI'},
        {field:'pacienteObj.nombre',displayName:'Nombre'},
        {field:'pacienteObj.apellido',displayName:'Apellido'},
        {field:'pacienteObj.fechaNac',displayName:'Fecha de Nacimiento'},
        {field:'motivo',displayName:'Motivo Control'},
        {field:'peso',displayName:'Peso'},
        {field:'talla',displayName:'Altura'},
        {field:'tension_arterial',displayName:'Tension Arterial'},
        {field:'diagnostico',displayName:'Diagnostico'},
        {field:'fecha',displayName:'Fecha control'},
        {field:'pacienteObj.genero',displayName:'Genero'},
        {field:'temperatura',displayName:'Temperatura'},
        {field:'centroSalud',displayName:'Centro de Salud'}
      ], 
      type: 'json',
      header:`<h2 class="print-header">Controles Registrados</h2> <hr/>`,
      style:`
      .print-header{
        text-align: center;
        color:white;
        font-weight: bold;
        background-color:#333;
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
  excelTable(){
    const workbook = new ExcelJS.Workbook();
    const creat = workbook.creator = ('Centro de Salud');
    const worksheet = workbook.addWorksheet('Datos Paciente');
    console.log(this.datosMedicos);
    
    const dataStyle = {
      alignment: { horizontal: 'left' as 'left'},
      border: { bottom: { style: 'thin' } }
    };
  
    // Agregar encabezados de columna
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre Paciente', key: 'pacienteObj.nombre', width: 20 },
      { header: 'Apellido Paciente', key: 'pacienteObj.apellido', width: 20 },
      { header: 'Fecha Nacimiento', key: 'pacienteObj.fechaNac', width: 15 },
      { header: 'DNI Paciente', key: 'pacienteObj.dni', width: 15 },
      { header: 'Motivo Control', key: 'motivo', width: 20 },
      { header: 'Peso Paciente', key: 'peso', width: 10 },
      { header: 'Altura Paciente', key: 'altura', width: 10 },
      { header: 'IMC Paciente', key: 'imc', width: 10 },
      { header: 'Tensión Arterial', key: 'tension_arterial', width: 15 },
      { header: 'Diagnóstico Control', key: 'diagnostico', width: 30 },
      { header: 'Fecha de Control', key: 'fecha', width: 15 },
      { header: 'Genero', key: 'genero' },
      { header: 'Temperatura', key: 'temperatura', width:10 },
      { header: 'Centro de Salud', key: 'centroSalud', width:15 }
    ];
    for(this.datoMed of this.datosMedicos){
      worksheet.addRow({
        id: this.datoMed.idDatoMedico,
        'pacienteObj.nombre': this.datoMed.pacienteObj.nombre,
        'pacienteObj.apellido': this.datoMed.pacienteObj.apellido,
        'pacienteObj.fechaNac': this.datoMed.pacienteObj.fechaNac,
        'pacienteObj.dni': this.datoMed.pacienteObj.dni,
        motivo: this.datoMed.motivo,
        peso: this.datoMed.peso,
        altura: this.datoMed.talla,
        imc: this.datoMed.imc,
        tension_arterial: this.datoMed.tension_arterial,
        diagnostico: this.datoMed.diagnostico,
        fecha:this.datoMed.fecha,
        genero: this.datoMed.pacienteObj.genero,
        temperatura: this.datoMed.temperatura,
        centroSalud: this.datoMed.centroSalud
      });
      console.log(this.datoMed)
    }
    worksheet.eachRow({ includeEmpty: true }, row => {
      row.eachCell(cell => {
        cell.style = {
          alignment: { horizontal: 'left' as 'left'},
          border: { bottom: { style: 'thin' } }
        }
      });
    });
    
    worksheet.getRow(1).eachCell({ includeEmpty: true }, cell => {
      cell.style = {
        font: { bold: true },
        alignment: { horizontal: 'center' },
        border: { bottom: { style: 'thin'} },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' } }
      };
    });
    workbook.xlsx.writeBuffer().then((data:ArrayBuffer) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `informeControles_${this.fecha}_${this.pacienteBuscado.nombre}_${this.pacienteBuscado.apellido}.xlsx`
      a.click()
    })
  }
  imprimirPdfMujer(){
    printJS({
      printable: this.datosMedicos, 
      properties: [
        {field:'pacienteObj.dni',displayName:'DNI'},
        {field:'pacienteObj.nombre',displayName:'Nombre'},
        {field:'pacienteObj.apellido',displayName:'Apellido'},
        {field:'pacienteObj.fechaNac',displayName:'Fecha de Nacimiento'},
        {field:'motivo',displayName:'Motivo Control'},
        {field:'peso',displayName:'Peso'},
        {field:'talla',displayName:'Altura'},
        {field:'tension_arterial',displayName:'Tension Arterial'},
        {field:'diagnostico',displayName:'Diagnostico'},
        {field:'fecha',displayName:'Fecha control'},
        {field:'pacienteObj.genero',displayName:'Genero'},
        {field:'fechaMenstruacion',displayName:'Fecha de ultima Menstruacion'},
        {field:'temperatura',displayName:'Temperatura'},
        {field:'centroSalud',displayName:'Centro de Salud'}
      ], 
      type: 'json',
      header:`<h2 class="print-header">Controles Registrados</h2> <hr/>`,
      style:`
      .print-header{
        text-align: center;
        color:white;
        font-weight: bold;
        background-color:#333;
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
  excelTableMujer(){
    const workbook = new ExcelJS.Workbook();
    const creat = workbook.creator = ('Centro de Salud');
    const worksheet = workbook.addWorksheet('Datos Paciente');
    console.log(this.datosMedicos);
    
    const dataStyle = {
      alignment: { horizontal: 'left' as 'left'},
      border: { bottom: { style: 'thin' } }
    };
  
    // Agregar encabezados de columna
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre Paciente', key: 'pacienteObj.nombre', width: 20 },
      { header: 'Apellido Paciente', key: 'pacienteObj.apellido', width: 20 },
      { header: 'Fecha Nacimiento', key: 'pacienteObj.fechaNac', width: 15 },
      { header: 'DNI Paciente', key: 'pacienteObj.dni', width: 15 },
      { header: 'Motivo Control', key: 'motivo', width: 20 },
      { header: 'Peso Paciente', key: 'peso', width: 10 },
      { header: 'Altura Paciente', key: 'altura', width: 10 },
      { header: 'IMC Paciente', key: 'imc', width: 10 },
      { header: 'Tensión Arterial', key: 'tension_arterial', width: 15 },
      { header: 'Diagnóstico Control', key: 'diagnostico', width: 30 },
      { header: 'Fecha de Control', key: 'fecha', width: 15 },
      { header: 'Genero', key: 'genero' },
      { header: 'Temperatura', key: 'temperatura', width:10 },
      { header: 'Fecha de ultima Menstruacion', key: 'fechaMenstruacion', width: 15 },
      { header: 'Centro de Salud', key: 'centroSalud', width:15 }
    ];
    for(this.datoMed of this.datosMedicos){
      worksheet.addRow({
        id: this.datoMed.idDatoMedico,
        'pacienteObj.nombre': this.datoMed.pacienteObj.nombre,
        'pacienteObj.apellido': this.datoMed.pacienteObj.apellido,
        'pacienteObj.fechaNac': this.datoMed.pacienteObj.fechaNac,
        'pacienteObj.dni': this.datoMed.pacienteObj.dni,
        motivo: this.datoMed.motivo,
        peso: this.datoMed.peso,
        altura: this.datoMed.talla,
        imc: this.datoMed.imc,
        tension_arterial: this.datoMed.tension_arterial,
        diagnostico: this.datoMed.diagnostico,
        fecha:this.datoMed.fecha,
        genero: this.datoMed.pacienteObj.genero,
        temperatura: this.datoMed.temperatura,
        fechaMenstruacion: this.datoMed.fechaMenstruacion,
        centroSalud: this.datoMed.centroSalud
      });
      console.log(this.datoMed)
    }
    worksheet.eachRow({ includeEmpty: true }, row => {
      row.eachCell(cell => {
        cell.style = {
          alignment: { horizontal: 'left' as 'left'},
          border: { bottom: { style: 'thin' } }
        }
      });
    });
    
    worksheet.getRow(1).eachCell({ includeEmpty: true }, cell => {
      cell.style = {
        font: { bold: true },
        alignment: { horizontal: 'center' },
        border: { bottom: { style: 'thin'} },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' } }
      };
    });
    workbook.xlsx.writeBuffer().then((data:ArrayBuffer) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `informeControles_${this.fecha}_${this.pacienteBuscado.nombre}_${this.pacienteBuscado.apellido}.xlsx`
      a.click()
    })
  }
}