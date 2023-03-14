import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router"
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrls: ['./register-new-user.component.scss']
})
export class RegisterNewUserComponent {

  formRegister!: FormGroup;
  mensajeSuccess = false
  mensajeError = false
  validacionFormulario = false
  mensajeFinal: any;

  constructor(private fb: FormBuilder, private router: Router, private usuarioservice: UsuarioService) { }

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
      usuario = new Usuario()
      usuario.user_name = this.formRegister.value.nombreUsuario
      usuario.user_lastname = this.formRegister.value.apellidoUsuario
      usuario.user_email = this.formRegister.value.correoUsuario
      usuario.user_status = true

      //TODO:REVISIAR PORQUE AL ENVIAR UN CORREO QUE YA EXISTE LA PETICION RETORNA UN STATUS 400

      //VALIDATE MATCH PASSWORD1 AND PASSWORD2
      if (this.formRegister.value.Password1 === this.formRegister.value.Password2) {
        usuario.user_password = this.formRegister.value.Password1
        //SEND DATA TO SERVICES
        this.usuarioservice.saveUsuario('/usuario/registro', usuario).subscribe(
          //SEND NEW USUARIO
          (data): any => {
            
            
              this.mensajeFinal = data
              this.mensajeSuccess = true
              this.mensajeError = false
              this.validacionFormulario = false
            

            /* this.formRegister *///buscar como limpiar formulario.
          },
          error => {
            if (error.hasOwnProperty("errors") || error.hasOwnProperty("error")) {
              console.log(error.errors)
              console.log(error.error.errors[0].msg)
              if (error.error.errors[0].hasOwnProperty("msg")) {
                this.mensajeFinal = error.error.errors[0].msg
                console.log(this.mensajeFinal)
                this.mensajeError = true
              }
            } 

            console.log("Ha ocurrido un error en la llamada: ", error)
          });
      } else {
        this.mensajeFinal = "Las contraseñas no coinciden"
        this.mensajeSuccess = false
        this.mensajeError = true
        this.validacionFormulario = false
      }
    }else{      
      this.validacionFormulario = true
    }
  }

}
