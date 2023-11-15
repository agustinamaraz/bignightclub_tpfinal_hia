import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/models/paciente';
import { error } from 'console';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  usuario!: Usuario;
  roles!: Array<Rol>;
  fechaBoolean!: boolean;
  emailBoolean!: boolean;
  returnUrl!: string;
  fecha!: string;
  nombre!: string;
  apellido!: string;
  returnUrlLogin!: string
  modifica: boolean = false;
  repeatedEmail!: boolean;
  repeatedUsername!: boolean;
  loadPassword: boolean = false;
  loadEmail: boolean = false;
  loadUsername: boolean = false;
  paciente!: Paciente;
  fechaActual!: string;
  sexo!: string;
  id: string = ""
  selectedRole!: Rol
  constructor(private usuarioService: LoginService, private activatedRoute: ActivatedRoute, private route: Router, private toastr: ToastrService,
    private pacienteService: PacienteService) {
    this.paciente = new Paciente();
    this.usuario = new Usuario();
    this.roles = new Array<Rol>();
    this.fechaActual = String(new Date().toLocaleDateString('es-ar'));
  }
  ngOnInit(): void {
    this.getRoles()
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == '0') {
        this.modifica = false;
      } else {
        this.modifica = true;
        this.id = params['id'];

        console.log(this.modifica)
      }
    });
    // setTimeout(() => {
    //   this.initializeForm();
    // });
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/home';
    this.returnUrlLogin = this.activatedRoute.snapshot.queryParams['returnUrlLogin'] || '/login'
  }
  onSubmit() {

  }

  getRoles() {
    this.usuarioService.getRoles().subscribe(
      result => {
        console.log(result, result[0]._id);
        this.roles = result

      },
      error => {
        console.log(error)
      }
    )
  }

  esAdministrador() {
    return this.usuarioService.esAdmin();
  }
  onChangeOptions(rol: Rol) {
    console.log(rol._id)
  }
  verificarTexto() {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,9}$/;
    if (emailRegex.test(this.usuario.email)) {
      console.log('El texto ingresado corresponde a un email');
      this.emailBoolean = true;
      console.log("a true")
    } else {
      console.log('El texto ingresado corresponde a un texto normal');
      this.emailBoolean = false;
      console.log("a false")
    }
  }
  comprobarFecha(): boolean {
    const fechaActualObj = new Date(this.fechaActual);
    const fechaIngresadaObj = new Date(this.fecha);
    console.log("Estableci fechas")
    if (fechaIngresadaObj <= fechaActualObj) {
      console.log("Mayor")
      this.fechaBoolean = true
      return true;
    } else {
      console.log("Menor")
      this.fechaBoolean = false
      return false
    }
  }
  createUser() {
    this.verificarTexto();
    this.comprobarFecha();
    if (!this.emailBoolean) {
      this.toastr.error("El email que ingreso no se corresponde con el formato requerido")
    } else {
      if (this.fechaBoolean) {
        this.toastr.error("No se puede ingresar una fecha de nacimiento mayor a la fecha actual")
      } else {
        console.log(this.usuario.rol.descripcion + '  ' + JSON.stringify(this.usuario.rol))
        if (!this.esAdministrador()) {
          this.usuario.rol._id = '64b2017d7c183cf4b0883ead'
        }
        this.usuarioService.signUp(this.usuario.username, this.usuario.password, this.usuario.email, this.usuario.rol._id, this.usuario.dni).subscribe(
          result => {
            console.log(result);
            this.paciente.apellido = this.apellido; this.paciente.dni = this.usuario.dni
            this.paciente.nombre = this.nombre; this.paciente.fechaNac = this.fecha
            this.paciente.genero = this.sexo;
            this.pacienteService.createPaciente(this.paciente).subscribe(
              result => {
                console.log(result)
              },
              error => {
                console.log(error)
              }
            )
            this.toastr.success('Registrado correctamente')
            this.login();
          },
          error => {
            console.log(error);
            if (error.error.message === 'Este email ya está en uso') {
              console.log("Este email ya fue registrado");
              this.usuario.email = "";
              this.repeatedEmail = true;
              [this.loadPassword, this.loadEmail] = [true, true];
            }
            if (error.error.message === 'Este nombre de usuario ya está en uso') {
              console.log("Este nombre de usuario ya fue registrado");
              this.usuario.username = "";
              this.repeatedUsername = true;
              [this.loadPassword, this.loadUsername] = [true, true];
            }
            if (error.status == 448) {
              console.log("Tanto el email como el nombre de usuario ya estan registrados");
              this.usuario.email = "";
              this.usuario.username = "";
              this.repeatedEmail = true;
              this.repeatedUsername = true;
              [this.loadPassword, this.loadEmail, this.loadUsername] = [true, true, true];

            }
          }
        )
      }
    }
  }
  login() {
    this.usuarioService.login(this.usuario.username, this.usuario.password)
      .subscribe(
        result => {
          var user = result;
          if (user.status == 1) {
            //guardamos el user en cookies en el cliente
            sessionStorage.setItem("usuario", JSON.stringify(user));
            sessionStorage.setItem("token", user.token);
            sessionStorage.setItem("user", user.username);
            sessionStorage.setItem("userid", user.userid);
            sessionStorage.setItem("rol", JSON.stringify(user.rol));
            sessionStorage.setItem("userDni", user.dni)
            //redirigimos a home o a pagina que llamo
            this.route.navigateByUrl(this.returnUrl);
          }
        },
        error => {
          this.toastr.error("Error de conexion");
          console.log("error en conexion");
          console.log(error);
        });
  }
  modifyUser() {
    this.usuarioService.signUp(this.usuario.username, this.usuario.password, this.usuario.email, this.usuario.rol._id, this.usuario.dni).subscribe(
      result => {
        console.log(result);
        this.toastr.success('Registrado correctamente')
      },
      error => {
        console.log(error);
        this.toastr.error('No pudo ser registrado')
      }
    )
  }
  loginGo() {
    this.route.navigateByUrl(this.returnUrlLogin)
  }
}
