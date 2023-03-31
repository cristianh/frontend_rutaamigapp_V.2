import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from "@angular/router"

@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.scss']
})
export class UserResetPasswordComponent {

  constructor(private fb: FormBuilder, private router: Router, private usuarioservice: UsuarioService) { }

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

      let dataUsuario = { "correo_usuario": `${this.formResetPassword.value.email}` }

      //SEND DATA TO SERVICES
      this.usuarioservice.resetPassword('/auth/forgetPassword', dataUsuario).subscribe(
        //SEND NEW USUARIO
        (data: any): any => {
          console.log(data)
          if (data) {

            if (data.hasOwnProperty("status")) {
              if (data.status == 'not-find') {

                this.mensajeError = true
                this.mensajeSuccess = false
                this.mensaje = data?.result;
              } else {
                this.mensajeError = false
                this.mensajeSuccess = true
                this.mensaje = data?.result;
              }
            } else {
              this.mensajeError = false
              this.mensajeSuccess = true
              
              this.mensaje = data?.result;
            }
          }
        },
        error => console.log("Ha ocurrido un error en la llamada: ", error))
    }
  }


}
