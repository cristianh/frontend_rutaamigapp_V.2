import { Component } from '@angular/core';
import { Router } from "@angular/router"
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resgister-user-list',
  templateUrl: './resgister-user-list.component.html',
  styleUrls: ['./resgister-user-list.component.scss']
})
export class ResgisterUserListComponent {

  formRegister!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioservice: UsuarioService,
    private toastr: ToastrService) {

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
      console.log(this.formRegister)
      console.log(this.formRegister.controls['nombreUsuario'].errors)
      console.log(this.formRegister.controls['apellidoUsuario'].errors)
      console.log(this.formRegister.controls['correoUsuario'].errors)
      console.log(this.formRegister.controls['passwordUsuario'].errors)
      this.toastr.error("Error en el formulario","Revise por favor");
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
        (data: any): any => {
          console.log(data)
          /* this.formRegister *///buscar como limpiar formulario.
          this.formRegister.reset()
          this.toastr.success(`${data.status}`, "Correcto!");
          this.router.navigate(['/dashboard/listar-usuarios'])

        },
        error => {
          this.toastr.error("Ha ocurrido un error en la llamada", `${error.message}`);
          /* if (error.hasOwnProperty("errors") || error.hasOwnProperty("error")) {
            console.log(error.errors)
            console.log(error.error.errors[0].msg)
            if (error.error.errors[0].hasOwnProperty("msg")) {

            }
          } */

          console.log("Ha ocurrido un error en la llamada: ", error)
        });

    }
  }

}
