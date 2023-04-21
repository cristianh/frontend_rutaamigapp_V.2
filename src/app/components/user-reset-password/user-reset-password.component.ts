import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.scss']
})
export class UserResetPasswordComponent {

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private usuarioservice: UsuarioService,
    private toastr: ToastrService
    ) { }

  formResetPassword: any;

  public email: string ="";
  public mensajeSuccess: boolean = false;
  public mensajeError: boolean = false;
  public mensaje: string = "";

  

  ngOnInit(): void {
    this.formResetPassword = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    })
  }



  onSubmit() {
    if (this.formResetPassword.valid) {

      let dataUsuario = { "user_email": `${this.formResetPassword.value.email}` }

      //SEND DATA TO SERVICES
      this.usuarioservice.resetPassword('auth/forgetPassword', dataUsuario).subscribe(
        //SEND NEW USUARIO
        (data: any): any => {
          console.log(data)
          if (data) {
            
            if (data.hasOwnProperty("status")) {
              if (data.status == 'not-find') {
                
                this.mensaje = data?.result;
                this.toastr.warning(`${this.mensaje}`,"Atencion!");
              } else {
              
                this.mensaje = data?.result;
                this.toastr.success(`${this.mensaje}`,"Correcto!");
              }
            } else {                   
                this.mensaje = data?.result;
                this.toastr.success(`${this.mensaje}`,"Correcto!");  
            }
          }
        },
        error => {
          this.toastr.error(`${this.mensaje}`,"Atencion!");
          
          console.log("Ha ocurrido un error en la llamada: ", error)
        })
    }
  }


}
