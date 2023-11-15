import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  password!:string;
  id!:string;
  returnUrl!:string;
  email!:string;
  notFound!:boolean;
  notVerified:boolean=false;
  form:boolean=false;
  constructor(private loginService:LoginService, private activatedRoute: ActivatedRoute, private route:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] != '0') {
        this.id = params['id'];
        this.form = true;
        console.log(this.id)
        console.log(this.form)
      }
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/home';
  }
  verificarTexto(texto:any):boolean {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,9}$/;
    if (emailRegex.test(texto)) {
      console.log('El texto ingresado corresponde a un email');
      return true;
    } else {
      console.log('El texto ingresado corresponde a un texto normal');
      return false;
    }
  }
  resetAsk(){
    console.log(this.email)
    if(!this.verificarTexto(this.email)){
      this.toastr.error('El email ingresado no cumple con el formato')
      this.email = ''
    }else{
    this.loginService.resetAsk(this.email).subscribe(
      result=>{
        console.log(result);
        this.returnUrl;
        this.toastr.success("Se envio un correo a su email para reestablecer su contraseña, Verifique tambien la categoria Spam")
        // setTimeout(() => {
        //   window.location.reload(); // Recargar la página actual
        // }, 5000);
      },
      error=>{
        console.log(error)
        if (error.status === 499) {
          this.notFound = true;
          let myDiv = document.getElementById('errorEmail')!;
          if (myDiv) {
            myDiv.style.display = 'block';
            setTimeout(() => {
              myDiv.style.display = 'none';
            }, 3000);
          }
        }
        if(error.status === 498){
          console.log(this.notVerified)
          this.notVerified = true
          console.log(this.notVerified)
        }
      }
    )
  }
}


  reset(){
    console.log(this.id);
    console.log(this.password);
    this.loginService.resetPassword(this.password, this.id).subscribe(
      result=>{
        console.log(result)
        this.toastr.success("Contraseña restablecida correctamente");
        this.route.navigateByUrl(this.returnUrl);
      },
      error=>{
        console.log(error)
      }
    )
  }
}
