import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-resgister-user-list',
  templateUrl: './resgister-user-list.component.html',
  styleUrls: ['./resgister-user-list.component.scss']
})
export class ResgisterUserListComponent {

  formRegister!: FormGroup;

  constructor(private fb: FormBuilder, private usuarioservice: UsuarioService) {

  }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      nombreUsuario: ['', Validators.required],
      apellidoUsuario: ['', [Validators.required]],
      correoUsuario: ['', [Validators.email, Validators.required]],
      passwordUsuario: ['', Validators.required]
    })
  }

  onSubmit() {
    console.log(this.formRegister.valid)
    if (!this.formRegister.valid) {
      /* this.mensaje = false
      this.mensajeError = true */
    } else {
      let usuario: Usuario;
      usuario = new Usuario()
      usuario.user_name = this.formRegister.value.nombreUsuario
      usuario.user_lastname = this.formRegister.value.apellidoUsuario
      usuario.user_email = this.formRegister.value.correoUsuario
      usuario.user_password = this.formRegister.value.passwordUsuario
      usuario.user_status = true

      //SEND DATA TO SERVICES
      this.usuarioservice.saveUsuario('/usuario/registro', usuario).subscribe(
        //SEND NEW USUARIO
        (data): any => {
          console.log(data)
          /* this.formRegister *///buscar como limpiar formulario.
        },
        error => {
          if (error.hasOwnProperty("errors") || error.hasOwnProperty("error")) {
            console.log(error.errors)
            console.log(error.error.errors[0].msg)
            if (error.error.errors[0].hasOwnProperty("msg")) {

            }
          }

          console.log("Ha ocurrido un error en la llamada: ", error)
        });

    }
  }

}
