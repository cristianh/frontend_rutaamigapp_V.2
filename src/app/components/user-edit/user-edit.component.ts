import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Usuario } from 'src/app/models/usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {

  
  
  usuarioDemo = new Usuario()
  formUpdate!: FormGroup;
  id: any;
  token:string |null= '';
  isLoading:boolean = true;
  usuario: any = {
    "user_name":'',
    "user_lastname":'',
    "user_email":''
  };
  url = environment.API_URL;



  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioservice: UsuarioService,
    public auth: AuthService,
    private toastr: ToastrService) {

  }

  ngOnInit() {

    this.formUpdate = this.fb.group({
      nombreUsuario: ['', Validators.required],
      apellidoUsuario: ['', [Validators.required]],
      correoUsuario: ['', [Validators.email, Validators.required]],         
    })

      this.token = this.auth.getToken();
     
      this.route.params.subscribe(params => {
        this.id = params['id'];
        // Aquí puedes hacer lo que necesites con el valor del parámetro
      });
  
      this.usuarioservice.getUserById(`${this.url}/user/${this.id}`, !this.token ? '' : this.token).subscribe(
        (data: any): any => {
          console.log(".......................", data)
          
       
          this.usuario = data;        
          
          this.isLoading = false
        },
        error => console.log("Ha ocurrido un error en la llamada: ", error)
  
      )
    }

    onSubmit() {
    console.log(this.formUpdate.valid)
    if (!this.formUpdate.valid) {
      
      this.toastr.error("Error en el formulario","Revise por favor");
    } else {
      let usuario: Usuario;
      usuario = new Usuario()
      usuario.user_name = this.formUpdate.value.nombreUsuario
      usuario.user_lastname = this.formUpdate.value.apellidoUsuario
      usuario.user_email = this.formUpdate.value.correoUsuario
      usuario.user_password = this.usuario.user_password
      usuario.user_status = this.usuario.user_status

      this.usuarioservice.updateUsuarioById(`/user/${this.id}`,usuario, !this.token ? '' : this.token).subscribe(
        (data: any): any => {
          console.log(".......................", data)
          
          const toast = this.toastr.success("Usuario Actualizado","¡Atencion!");
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/dashboard/listar-usuarios']);         
          });
       
          this.usuario = data;        
          
          this.isLoading = false
        },
        error => console.log("Ha ocurrido un error en la llamada: ", error)
      );
    }
  }
    
  
}
