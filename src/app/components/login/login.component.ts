import { Component } from '@angular/core';
import { Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {


  formLogin!: FormGroup;

  public email!: string;
  public password!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioservice: UsuarioService,
    public auth: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    })

  }

  onIngresar() {

    /* event.preventDefault(); */

    let usuario: Usuario



    if (this.formLogin.valid) {
      usuario = new Usuario()
      usuario.user_email = this.formLogin.value.email
      usuario.user_password = this.formLogin.value.password
      //SEND DATA TO SERVICES
      this.usuarioservice.loginUsuario('auth/login', usuario).subscribe(
        //SEND NEW USUARIO
        (data: any): any => {

          if (data) {
            console.log('Success:', data)
            //se almacena el token usando el servicio Auth
            this.auth.login(data.token)
            //se almacena el nombre del usuario en el almacenamiento de
            //sesion
            let usuario = {
              nombre: data.usuario.nombre,
              apellido: data.usuario.apellido,
              rol: data.usuario.rol,
              img: data.usuario.img==undefined?"Not found":data.usuario.img
            }

            this.auth.setCurrentUser(usuario)
            //navegamos de nuevo al home, esta vez como usuario
            //logueado
            this.router.navigate(['/dashboard/listar-usuarios'])

            /* document.getElementById('mensaje').classList.add('hidden')
            document.getElementById('mensaje-error').innerHTML = '' */
            //window.location = '/map';
          }

          /* this.formRegister *///buscar como limpiar formulario.
        },
        error => {
          if (error.error.result) {
            this.toastr.error(`${error.error.result}`, "Atencion!");
          }
          else {
            this.toastr.error(`${error.message}`, "Atencion!");
          }
          console.log("Ha ocurrido un error en la llamada: ", error)
        })


    }





  }

}


