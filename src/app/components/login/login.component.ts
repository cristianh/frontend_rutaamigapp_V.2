import { Component } from '@angular/core';
import { Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {
  

  formLogin!: FormGroup;

  public email!: string;
  public password!: string;

  constructor(private fb: FormBuilder, private router: Router, private usuarioservice: UsuarioService) { }

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
          usuario.correo_usuario = this.formLogin.value.email
          usuario.password_usuario = this.formLogin.value.password
          //SEND DATA TO SERVICES
          this.usuarioservice.loginUsuario('/auth/login', usuario).subscribe(
              //SEND NEW USUARIO
              (data: any): any => {

                  if (data) {
                      console.log('Success:', data)
                      this.router.navigate(['/mapa'])

                      /* document.getElementById('mensaje').classList.add('hidden')
                      document.getElementById('mensaje-error').innerHTML = '' */
                      //window.location = '/map';
                  } else {
                      console.log('Success:', data)
                      /* if (response.errors) {
                          document.getElementById('mensaje').classList.remove('hidden')
                          let errorMessague = []
                          response.errors.forEach(element => {
                              errorMessague.push(element.msg)
  
                          });
                          document.getElementById('mensaje-error').innerHTML = ''
                          errorMessague.forEach(element => {
                              document.getElementById('mensaje-error').innerHTML += `${element}<br>`
                          });
                      }
                      if (response.error) {
                          document.getElementById('mensaje').classList.remove('hidden')
                          document.getElementById('mensaje-error').innerHTML += `${response.error} <a href="registroDemo.html">Registrar</a>`
                      } */
                  }


                  /* this.formRegister *///buscar como limpiar formulario.
              },
              error => console.log("Ha ocurrido un error en la llamada: ", error))


      }





  }

}


