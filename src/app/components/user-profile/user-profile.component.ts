import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
/* Importar servicios y servicio de auth */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  usuarios: any;
  isLoading: boolean = false;
  url = environment.API_URL;
  //url = 'http://localhost:3000/api';

  constructor(
    private usuarioservice: UsuarioService,
    public auth: AuthService,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    let token = this.auth.getToken()
    this.isLoading = true;
    let userId: string | any = this.auth.getUserId()

    const { Id } = JSON.parse(userId)
    console.log(Id)


    this.usuarioservice.getUserById(`${this.url}/user/${Id}`, !token ? '' : token).subscribe(
      (data: any): any => {
        console.log(".......................", data)
        this.usuarios = [data];
        console.log(this.usuarios);
        this.isLoading = false
      },
      error => console.log("Ha ocurrido un error en la llamada: ", error)

    )
  }
}
