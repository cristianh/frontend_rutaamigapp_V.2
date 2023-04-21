import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { Router, ActivatedRoute } from "@angular/router"
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-new-password',
  templateUrl: './user-new-password.component.html',
  styleUrls: ['./user-new-password.component.scss']
})
export class UserNewPasswordComponent {
  formNewPassword: any;

  public email: string = "";
  public mensajeFinal: string = "";

  public mensajeSuccess: boolean = false;
  public mensajeError: boolean = false;
  public mensaje: string = "";
  public mensajeErrors: any;

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute, 
    private usuarioservice: UsuarioService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {


    this.formNewPassword = this.fb.group({
      password1: ['', [Validators.required]],
      password2: ['', [Validators.required]],
    })
  }


  onSubmit() {
    if (this.formNewPassword.valid) {

      // VALIDATE PASSWORDS MATCH
      if (this.formNewPassword.value.password1 !== this.formNewPassword.value.password2) {
        this.toastr.warning("Error las contraseñas no coinciden","Error!");
      } else {

        let usuario = {
          "id": this.route.snapshot.paramMap.get('id'),
          "token": this.route.snapshot.paramMap.get('token'),
          "password_usuario": this.formNewPassword.value.password1
        }

        //SEND DATA TO SERVICES
        this.usuarioservice.updatePasswordUsuario('/auth/updatePasswordUsuario', usuario).subscribe(
          //SEND NEW EMAIL
          (data: any): any => {

            if (data) {              
             /*  this.mensajeError = false
              this.mensajeSuccess = true */   
              this.mensajeSuccess = true           
              this.mensaje = `${data?.result}`;               
              this.toastr.success(`${this.mensaje}`,"Correcto!");           
            }
          },
          error => {
            /* this.mensajeError = true
            this.mensajeSuccess = false */

            if (error.hasOwnProperty("error")) {
              if (error.hasOwnProperty("msg")) {
                this.mensajeErrors = error.error.msg;
                this.toastr.error(`${this.mensajeErrors}`,"Error!");           
              } else {
                for (const key in error) {
                  if (Object.prototype.hasOwnProperty.call(error, key)) {
                    const element = error[key];
                    if (element.hasOwnProperty("errors")) {


                      this.mensajeErrors = element.errors[0].msg;
                      
                    } else {
                      
                      console.log(element.error)
                    }
                  }
                }
              }

            }
            console.log("Ha ocurrido un error en la llamada: ", error)
          })
      }
    }
  }

}
