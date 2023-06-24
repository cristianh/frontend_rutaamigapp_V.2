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
  imgProfileUser:any
  imgProfile:string='https://res.cloudinary.com/dl7oqoile/image/upload/v1685113568/Icon_ProfileUser_Estilo_Grey_2_ttzzns.svg'
  //url = 'http://localhost:3000/api';

  constructor(
    private usuarioservice: UsuarioService,
    public auth: AuthService,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    let token = this.auth.getToken()
    this.isLoading = true;
    let userId: string | any = this.auth.getUserId()

    this.imgProfileUser = this.auth.getCurrentUser()

    this.imgProfileUser= JSON.parse(this.imgProfileUser)

    if(this.imgProfileUser?.usuario?.img!=="Not found"){
      this.imgProfile=this.imgProfileUser?.usuario?.img;
    }else{
      this.imgProfile ='https://res.cloudinary.com/dl7oqoile/image/upload/v1685113568/Icon_ProfileUser_Estilo_Grey_2_ttzzns.svg'
    }

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
