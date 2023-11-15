import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  id!:string
  constructor(private usuarioService: LoginService, private activatedRoute:ActivatedRoute, private router: Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] != '0') {
        this.id = params['id'];
        console.log(this.id)
      }
    });
  }
  confirm(){
    this.usuarioService.confirm(this.id).subscribe(
      result=>{
        console.log(result)
        this.toastr.success("Cuenta confirmada");
        this.router.navigate(["home"]);
      },
      error=>{
        this.toastr.error("No se pudo confirmar su cuenta");
        console.debug(error)
      }
    )
  }
}
