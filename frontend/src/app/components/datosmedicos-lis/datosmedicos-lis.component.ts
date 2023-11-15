import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosMedicos } from 'src/app/models/datos-medicos';
import { DatosMedicosServiceService } from 'src/app/services/datos-medicos-service.service';
import * as ExcelJS from 'exceljs'
import * as printJS from 'print-js'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-datosmedicos-lis',
  templateUrl: './datosmedicos-lis.component.html',
  styleUrls: ['./datosmedicos-lis.component.css']
})
export class DatosmedicosLisComponent implements OnInit{
  datosMedicos:Array<DatosMedicos>;
  datosMedicosAux:Array<DatosMedicos>;
  datoMed!:DatosMedicos;
  datosMedicosHuaico:Array<DatosMedicos>;
  datosMedicosCuyaya:Array<DatosMedicos>;
  datosMedicosMujer:Array<DatosMedicos>;
  datosMedicosHombre:Array<DatosMedicos>;
  choseMujer:boolean=false;
  tipoArchivo!:string;
  choseHombreOtro:boolean=false;
  choseGeneral:boolean=false;
  choseHuaico:boolean=false;
  choseCuyaya:boolean=false;
  datoMedicoEliminar:DatosMedicos
  fecha!:string;
  gender:boolean = false
  searchText = '';
  constructor(private datosMedicosService:DatosMedicosServiceService, private router:Router,private toastr:ToastrService){
    this.datosMedicos=new Array<DatosMedicos>();
    this.datosMedicosAux=new Array<DatosMedicos>();
    this.fecha = String(new Date().toLocaleDateString('es-ar'));
    this.datosMedicosHuaico=new Array<DatosMedicos>();
    this.datosMedicosCuyaya=new Array<DatosMedicos>();
    this.datosMedicosMujer=new Array<DatosMedicos>();
    this.datosMedicosHombre=new Array<DatosMedicos>();
    this.datoMedicoEliminar = new DatosMedicos();
  }
  ngOnInit(): void {
    this.getAllData();
  }
  filterCentro(){
    this.datosMedicosHuaico = this.datosMedicos.filter(d => d.centroSalud === "Centro Huaico");
    this.datosMedicosCuyaya = this.datosMedicos.filter(d => d.centroSalud === "Centro Cuyaya");
  }
  filterGender(){
    this.datosMedicosHombre = this.datosMedicos.filter(d => d.pacienteObj.genero === "Hombre" || d.pacienteObj.genero === "Otro");
    this.datosMedicosMujer = this.datosMedicos.filter(d => d.pacienteObj.genero === "Mujer");
  }
  getAllData(){
    this.datosMedicosService.getDatosMedicos().subscribe(
      result=>{
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
            nuevo.pacienteObj = result[i].paciente;
            nuevo.temperatura = result[i].temperatura
            nuevo.fechaMenstruacion = result[i].fechaMenstruacion;
            nuevo.centroSalud = result[i].centroSalud;
        this.datosMedicos.push(nuevo)
        }
        console.log(this.datosMedicos[4])
        this.filterCentro();
        this.filterGender();
      },
      error=>{
        console.log(error)
      }
    )
  }
  modificarDatoMedico(data:DatosMedicos){
    this.router.navigate(['datosMedicos-form',data.idDatoMedico])
  }
  eliminarDatoMedico(data:DatosMedicos){
    this.datosMedicosService.deleteDatosMedicos(data.idDatoMedico).subscribe(
      result=>{
        console.log(result)
        
        this.toastr.success('Control medico eliminado correctamente')
        const index = this.datosMedicos.findIndex(t => t.idDatoMedico === data.idDatoMedico);
        if (index !== -1) {
          this.datosMedicos.splice(index, 1);
        }
      },
      error=>{
        console.log(error)
        this.toastr.error('Control medico no pudo ser elminiado')
      }
    )
  }
  excelTableGeneral() {
    this.choseGeneral = true;
    this.tipoArchivo = "General"
    this.excelTable();
  }
  excelTableHombreOtro() {
    this.choseHombreOtro = true;
    this.tipoArchivo = 'Hombre_u_Otro'
    this.excelTable();
  }
  excelTableHuaico() {
    this.choseHuaico = true;
    this.tipoArchivo = 'Huaico'
    this.excelTableAll();
  }
  
  excelTableCuyaya() {
    this.choseCuyaya = true;
    this.tipoArchivo = 'Cuyaya'
    this.excelTableAll();
  }
  excelTableMujeres() {
    this.choseMujer = true;
    this.tipoArchivo = 'Mujeres'
    this.excelTableAll();
  }
  pdfGeneral(){
    this.choseGeneral = true
    this.tipoArchivo = "General"
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
  pdfHuaico(){
    this.choseHuaico = true;
    this.tipoArchivo = 'Huaico'
    this.imprimirPdf();
  }
  pdfCuyaya(){
    this.choseCuyaya = true;
    this.tipoArchivo = 'Cuyaya'
    this.imprimirPdf();
  }
  imprimirPdf(){
    if(this.choseHombreOtro){
      this.datosMedicosAux = this.datosMedicosHombre;
      printJS({
      printable: this.datosMedicosAux, 
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
      header:`<h2 class="print-header">Controles Registrados dia ${this.fecha}</h2> <hr/>`,
      style:`
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
    }else if(this.choseMujer){
      this.datosMedicosAux = this.datosMedicosMujer;
    }else if(this.choseCuyaya){
      this.datosMedicosAux = this.datosMedicosCuyaya;
    }else if(this.choseHuaico){
      this.datosMedicosAux = this.datosMedicosHuaico;
    }else if(this.choseGeneral){
      this.datosMedicosAux = this.datosMedicos;
    }
    printJS({
      printable: this.datosMedicosAux, 
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
      header:`<h2 class="print-header">Controles ${this.tipoArchivo} Registrados dia ${this.fecha}</h2> <hr/>`,
      style:`
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
    this.choseCuyaya = false;
    this.choseGeneral = false;
    this.choseHombreOtro = false;
    this.choseHuaico = false;
    this.choseMujer = false;
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
      { header: 'Genero', key: 'genero', width: 15 },
      { header: 'Centro de Salud', key: 'centroSalud', width: 15 },
    ];
    if(this.choseGeneral){
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
        centroSalud: this.datoMed.centroSalud
        
      });
      console.log(this.datoMed)
    }
  }
  if(this.choseHuaico){
    for(this.datoMed of this.datosMedicosHuaico){
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
        centroSalud: this.datoMed.centroSalud
        
      });
      console.log(this.datoMed)
    }
  }
  if(this.choseCuyaya){
    for(this.datoMed of this.datosMedicosCuyaya){
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
        centroSalud: this.datoMed.centroSalud
        
      });
      console.log(this.datoMed)
    }
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
      a.download = `informeControles_${this.fecha}_${this.tipoArchivo}.xlsx`
      a.click()
    })
    
    this.choseCuyaya = false;
    this.choseGeneral = false;
    this.choseHombreOtro = false;
    this.choseHuaico = false;
    this.choseMujer = false;
  }
  
  verControl(dni:string){
    this.router.navigate(['datosMedicosHome',dni])
  }
  excelTableAll(){
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
    for(this.datoMed of this.datosMedicosMujer){
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
      a.download = `informeControles_${this.fecha}_${this.tipoArchivo}.xlsx`
      a.click()
    })
    
    this.choseCuyaya = false;
    this.choseGeneral = false;
    this.choseHombreOtro = false;
    this.choseHuaico = false;
    this.choseMujer = false;
  }
  modalEliminar(data: DatosMedicos){
    this.datoMedicoEliminar = data;
    
  }
}

