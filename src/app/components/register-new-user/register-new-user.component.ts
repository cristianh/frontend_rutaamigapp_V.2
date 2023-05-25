import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router"
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PreloaderComponent } from '../preloader/preloader.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrls: ['./register-new-user.component.scss']
})
export class RegisterNewUserComponent implements OnInit {
  formRegister!: FormGroup;
  mensajeSuccess: boolean = false
  mensajeError: string = ''
  validacionFormulario: boolean = false
  isLoading: boolean = false;
  mensajeFinal: any;
  terminosCondiciones=false

  viewPasswordInput: boolean = false;
  viewPasswordConfirmInput: boolean = false;
  viewPasswordInputIcon: boolean = false;
  viewPasswordShowInput: boolean = false;


  constructor(private fb: FormBuilder, private router: Router, private usuarioservice: UsuarioService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      nombreUsuario: ['', Validators.required],
      apellidoUsuario: ['', [Validators.required]],
      correoUsuario: ['', [Validators.email, Validators.required]],
      Password1: ['', [Validators.required]],
      Password2: ['', [Validators.required]]
    })
  }

  onRegistrar() {
    let usuario: Usuario;

    if (this.formRegister.valid) {
      this.isLoading = true;
      usuario = new Usuario()
      usuario.user_name = this.formRegister.value.nombreUsuario
      usuario.user_lastname = this.formRegister.value.apellidoUsuario
      usuario.user_email = this.formRegister.value.correoUsuario
      usuario.user_status = true

      //VALIDATE MATCH PASSWORD1 AND PASSWORD2
      if (this.formRegister.value.Password1 === this.formRegister.value.Password2) {
        usuario.user_password = this.formRegister.value.Password1
        //SEND DATA TO SERVICES
        this.usuarioservice.saveUsuario('user/registro', usuario).subscribe(
          //SEND NEW USUARIO
          (data: any): any => {
            console.log(data)
            this.toastr.success(`${data.status}`, 'Correcto');
            setTimeout(() => {
              this.router.navigate([''])
            }, 1050);

            //Clean form.
            this.formRegister.reset();

          },
          error => {


            if (error.hasOwnProperty("errors") || error.hasOwnProperty("error")) {

              this.mensajeError= this.getMessageError(error.error.errors.slice())

              console.log(this.mensajeError.replace(/,/g, ''))

              this.toastr.error(this.mensajeError, '¡Atencion!', {
                enableHtml: true,
              });
            }



            this.isLoading = false;
            console.log("Ha ocurrido un error en la llamada: ", error)
          },
          () => {
            this.isLoading = false;
          });
      } else {
        this.toastr.info('Ha ocurrido un error', 'Las contraseñas no coinciden.');
      }
    } else {
      this.validacionFormulario = true
    }
  }

  getMessageError(messages:any){
    return `
    <ul type="disc">
    ${messages.map((message: any) => {
      return `<li>${message.msg}</li>`
    })
    }
    </ul>`
  }

  onChangeViewPassord() {
    this.viewPasswordInput = !this.viewPasswordInput
  }
  onChangeViewPassordConfirm() {
    this.viewPasswordConfirmInput = !this.viewPasswordConfirmInput
  }

  onshowPasswordIcon() {
    this.viewPasswordShowInput = true
  }
  onhidePasswordIcon() {
    this.viewPasswordShowInput = false
  }

}
