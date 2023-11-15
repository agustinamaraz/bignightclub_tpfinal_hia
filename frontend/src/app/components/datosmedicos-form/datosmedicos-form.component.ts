import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatosMedicos } from 'src/app/models/datos-medicos';
import { Paciente } from 'src/app/models/paciente';
import { DatosMedicosServiceService } from 'src/app/services/datos-medicos-service.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-datosmedicos-form',
  templateUrl: './datosmedicos-form.component.html',
  styleUrls: ['./datosmedicos-form.component.css']
})

export class DatosmedicosFormComponent implements OnInit{
  datoMedico!:DatosMedicos;
  id!:string
  datosMedicos!: Array<DatosMedicos>;
  pacientes: Paciente[] = [];
  pacientesAux: Paciente[] = [];
  filterText: string = '';
  myDropDown!: string;
  gender!:boolean;
  modifica!:boolean
  existOther:boolean = false
  filtroPacientes!:string;
  latestMedicalData!:DatosMedicos;
  asign:boolean=false;
  selectedPaciente:boolean=false;
  pacientesFiltrados: any[] = [];
  @ViewChild('selectList', { static: false }) selectList!: ElementRef;
  constructor(private pacienteService:PacienteService, private datosMedicosService: DatosMedicosServiceService, 
    private activatedRoute: ActivatedRoute, private router:Router,private toastr:ToastrService){
  this.datosMedicos = new Array<DatosMedicos>();
  this.datoMedico = new DatosMedicos();
  this.latestMedicalData = new DatosMedicos();
  this.filtroPacientes="";
    this.getAllPacientes();
    this.datoMedico.fecha = String(new Date().toLocaleDateString('es-ar'));
    //console.log(this.datoMedico.fecha);
  }

  ngOnInit(): void {
    this.pacientesAux = this.pacientes;
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == '0') {
        this.modifica = false;
      } else {
        this.modifica = true;
        this.id = params['id'];
        this.searchData(params['id']);
        console.log(this.modifica)
      }
    });
  }
  onSubmit() {
    if (this.modifica) {
      this.modifyMedicalData();
    } else {
      this.addMedicalData();
    }
  }
  verificarFormato() {
    // Usamos una expresión regular para verificar el formato
    var formatoValido = /^\d{2,3}\/\d{2,3}$/;
    
    // Verificamos si el texto cumple con el formato
    if (formatoValido.test(this.datoMedico.tension_arterial)) {
      var partes = this.datoMedico.tension_arterial.split('/');
      var valor1 = parseInt(partes[0]);
      var valor2 = parseInt(partes[1]);
      
      // Verificamos si los valores están en el rango válido
      if (valor1 >= 0 && valor1 <= 200 && valor2 >= 0 && valor2 <= 200) {
        return true; // El formato y los valores son válidos
      }
    }
    
    return false; // El formato o los valores son inválidos
  }
  isSelected(){
    console.log(this.datoMedico.paciente + ' adsadd')
    let cont:number=0;
    this.selectedPaciente = false
    if(this.datoMedico.paciente != '' && !this.selectedPaciente && cont===0){
      console.log('AAAAAAAAAAAAAAAAAAAAAAa')
      this.selectedPaciente = true
      cont=1;
      this.searchPacienteObj();
    }
  }
  searchPacienteObj(){
    console.log(this.datoMedico.paciente)
    this.pacienteService.getPacienteById(this.datoMedico.paciente).subscribe(
      result=>{
        console.log(result)
        this.datoMedico.pacienteObj = result
        this.getLatestMedicalData();
        if(result.genero === 'Mujer'){
          this.gender = true;
        }else{
          this.gender = false;
          this.datoMedico.fechaMenstruacion = "No registra";
        }
      },
      error=>{
        console.log(error)
      }
    )
  }
  filtrarPacientes() {
    console.log("Holaaaaaaaaaaaaaaaaaaaaaaaaa  " + this.filtroPacientes)
    if (!this.filtroPacientes) {
      this.pacientes = this.pacientesAux;
    } else {
      this.pacientes = this.pacientesAux.filter((paciente: any) => {
        const nombreCompleto = paciente.nombre + ' ' + paciente.apellido;
        return nombreCompleto.toLowerCase().includes(this.filtroPacientes.toLowerCase());
      });
    }

    console.log(this.pacientes.length);
    this.selectList.nativeElement.size = this.pacientes.length + 1;
  }
  
  onChangeofOptions(newGov:any) {
    console.log(newGov);
    this.isSelected()
  }
  searchData(id:string){
    this.datosMedicosService.getDatosMedicosId(id).subscribe(
      result=>{
        console.log(result);
        this.datoMedico = result;
        this.datoMedico.pacienteObj = result.paciente
        if(result.genero === 'Mujer'){
          this.gender = true;
        }else{
          this.gender = false;
        }
        console.log(this.datoMedico.pacienteObj.dni)
      },
      error=>{
        console.log(error)
      }
    )
  }
  getAllPacientes() {
    console.log("AAAAAAAAAAAAAAAAAAAA")
    this.pacienteService.getPacientes().subscribe(
      result => {
        let unPaciente = new Paciente();
        result.forEach((element: any) => {
          Object.assign(unPaciente, element);
          console.log(unPaciente.dni + ' a ' + element.dni)
          this.pacientes.push(unPaciente);
          console.log(this.pacientes[0].dni + ' dni pacientes')
          unPaciente = new Paciente();
        });
      },
      error => {
        console.log(error);
        this.toastr.warning("error en obtener todos los pacientes");
      }
    )
  }
  async getLatestMedicalData() {
    console.log(this.datoMedico.pacienteObj.dni);
    
    if (this.datoMedico.pacienteObj.dni !== undefined) {
      setTimeout(() => {
        this.datosMedicosService.getLatest(this.datoMedico.pacienteObj.dni).subscribe(
          result => {
            console.log(result);
            console.log(this.datoMedico);
            this.latestMedicalData = result[0];
            if(result.length === 0){
              console.log(result.length + ' Entro condicional')
              this.existOther= false
            }else{
              this.existOther = true
            }
          },
          error => {
            console.log(error);
            this.existOther = false
          }
        );
      }, 0);
    } else {
      console.log('NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOooo');
    }
  }
  asignLatest(){
    this.datoMedico = this.latestMedicalData
    this.datoMedico.fecha = String(new Date().toLocaleDateString('es-ar'));
  }
  
  addMedicalData() {
    this.datoMedico.imc = +(this.datoMedico.peso / ((this.datoMedico.talla) ** 2)).toFixed(3);
    console.log(this.datoMedico.paciente)
    if(this.verificarFormato()){
    this.datosMedicosService.addDatosMedicos(this.datoMedico.motivo, this.datoMedico.paciente,this.datoMedico.fecha,
      this.datoMedico.peso, this.datoMedico.imc, this.datoMedico.talla, this.datoMedico.tension_arterial,
      this.datoMedico.diagnostico, this.datoMedico.temperatura, this.datoMedico.fechaMenstruacion,this.datoMedico.centroSalud).subscribe(
      result=>{
        if(result.status == 1){
          this.datoMedico.idDatoMedico = result._id;
          this.toastr.success('Control medico eliminado correctamente')
          this.router.navigate(["/datosMedicos"]);
        } else {
          this.toastr.success(result)
        }
      },
      error => {
        this.toastr.error(error)
      }
    )
  }else{
    this.toastr.error("La tension arterial no cumple con el formato solicitado")
  }
}
  modifyMedicalData(){
    this.datoMedico.imc = +(this.datoMedico.peso / ((this.datoMedico.talla / 100) ** 2)).toFixed(3);
    console.log('Entro a modificar' + this.id)
    this.datosMedicosService.editDatosMedicos(this.id,this.datoMedico.motivo, this.datoMedico.paciente,this.datoMedico.fecha,
      this.datoMedico.peso, this.datoMedico.imc, this.datoMedico.talla, this.datoMedico.tension_arterial,
      this.datoMedico.diagnostico, this.datoMedico.temperatura, this.datoMedico.fechaMenstruacion,this.datoMedico.centroSalud).subscribe(
      result=>{
        if(result.status == 1){
          this.toastr.success('Editado Correctamente')
          this.router.navigate(["/datosMedicos"]);
        }else{
          this.toastr.success(result)
        }
      },
      error=>{
        this.toastr.error(error)
      }
    )
  }
}
