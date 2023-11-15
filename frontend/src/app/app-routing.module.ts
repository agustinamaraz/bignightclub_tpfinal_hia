import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { PacienteFormComponent } from './components/paciente-form/paciente-form.component';
import { DatosmedicosFormComponent } from './components/datosmedicos-form/datosmedicos-form.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DatosmedicosLisComponent } from './components/datosmedicos-lis/datosmedicos-lis.component';
import { DatosMedicosHomeComponent } from './components/datos-medicos-home/datos-medicos-home.component';
import { SignupComponent } from './components/signup/signup.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { VigilanteGuard } from './vigilante.guard';
import { FormAnuncioComponent } from './components/form-anuncio/form-anuncio.component';
import { ListAnuncioComponent } from './components/list-anuncio/list-anuncio.component';
import { ListAnuncioClienteComponent } from './components/list-anuncio-cliente/list-anuncio-cliente.component';
import { AnuncioComponent } from './components/anuncio/anuncio.component';
import { FormcontactoComponent } from './components/formcontacto/formcontacto.component';
import { ListContactoComponent } from './components/list-contacto/list-contacto.component';
import { EspecialistaFormComponent } from './components/especialista-form/especialista-form.component';
import { EspecialistaComponent } from './components/especialista/especialista.component';
import { CalendarclienteComponent } from './components/calendarcliente/calendarcliente.component';
import { TurnoComponent } from './components/turno/turno.component';
import { TurnoFormComponent } from './components/turno-form/turno-form.component';
import { TurnosDisponiblesComponent } from './components/turnos-disponibles/turnos-disponibles.component';
import { UsuariosRegistradosComponent } from './components/usuarios-registrados/usuarios-registrados.component';
const routes: Routes = [
{
    path:'login',
    component: LoginComponent
  },
  {
    path:'signUp/:id',
    component:SignupComponent
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'reset/:id',
    component:ResetpasswordComponent
  },
  { 
    path:'paciente',
    component:PacienteComponent,
    data:{
      rol: 'administrador'
    },
    canActivate:[VigilanteGuard]
  },
  {
    path:'paciente-form/:id',
    component:PacienteFormComponent,
    data:{
      rol: 'administrador'
    },
    canActivate:[VigilanteGuard]
  },
  {
    path:'datosMedicos-form/:id',
    component:DatosmedicosFormComponent,
    data:{
      rol: 'administrador'
    },
    canActivate:[VigilanteGuard]
  },
  {
    path:'datosMedicos',
    component:DatosmedicosLisComponent,
    data:{
      rol: 'administrador'
    },
    canActivate:[VigilanteGuard]
  },
  {
    path:'datosMedicosHome/:dni',
    component:DatosMedicosHomeComponent
  },
  {
    path:'confirm/:id',
    component:ConfirmComponent
  },
  {
    path:'calendar',
    component:CalendarComponent,
    data:{
      rol: 'administrador'
    },
    //canActivate:[VigilanteGuard]
  },
  {
    path:'calendarVisitante',
    component:CalendarclienteComponent
  },
  {
    path:'form-anuncio/:id',component:FormAnuncioComponent,
    data:{
      rol: 'administrador'
    },
    canActivate:[VigilanteGuard]
  },
  {
    path:'list-anuncio',component:ListAnuncioComponent,
    data:{
      rol: 'administrador'
    },
    canActivate:[VigilanteGuard]
  },
  {
    path:'formcontacto/:id',component:FormcontactoComponent,
    data:{
      rol: 'administrador'
    },
    canActivate:[VigilanteGuard]
  },
  {
    path:'list-contacto',component:ListContactoComponent,
    data:{
      rol: 'administrador'
    },
    canActivate:[VigilanteGuard]
  },
  {
    path:'turnos-disponibles',component:TurnosDisponiblesComponent,
  },
  {
    path:'list-anuncio-cliente',component:ListAnuncioClienteComponent,
    // data:{
    //   rol: 'administrador'
    // },
    // canActivate:[VigilanteGuard]
  },
  {
    path:'anuncio/:id',component:AnuncioComponent,
    // data:{
    //   rol: 'administrador'
    // },
    // canActivate:[VigilanteGuard]
  },
  {
    path:'especialista-form/:id',component:EspecialistaFormComponent,
    data:{
      rol: 'administrador'
    },
    canActivate:[VigilanteGuard]
  },
  {
    path:'especialista',component:EspecialistaComponent,
    data:{
      rol: 'administrador'
    },
    canActivate:[VigilanteGuard]
  },
  {
    path:'turno',component:TurnoComponent,
    // data:{
    //   rol: 'administrador'
    // },
    // canActivate:[VigilanteGuard]
  },
  {
    path:'turno-form/:id',component:TurnoFormComponent,
    data:{
      rol: 'administrador'
    },
    canActivate:[VigilanteGuard]
  },

  {
    path:'turnos-disponibles',component:TurnosDisponiblesComponent,
  },

  {
    path:'usuarios',component:UsuariosRegistradosComponent,
    data:{
      rol: 'administrador'
    },
    canActivate:[VigilanteGuard]
  },

  //lo siguiente siempre va al final
  {
    path:'**',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  
 /*
  {path:'form-anuncio/:id',component:FormAnuncioComponent},
   {path:'list-anuncio',component:ListAnuncioComponent}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
