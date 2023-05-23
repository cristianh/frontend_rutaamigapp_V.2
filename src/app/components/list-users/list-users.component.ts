import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
//import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {

  constructor(private usuarioservice: UsuarioService, private auth: AuthService) { }

  usuarios: Usuario[] = []
  paginado: number = 0
  itemsPaginado: number = 0
  contadorSaltos: number = 0
  pageLimit: number = 6
  take: number = 0
  isLoading: boolean = false;

  //url = environment.API_URL;
  url = 'http://localhost:3000/api';
  ngOnInit(): void {

    let token = this.auth.getToken()
    this.isLoading = true;
    //Realizamos la peticion de los usuarios
    this.usuarioservice.getAllUsuarios(`${this.url}/user/allusers?all=true`,!token?'':token).subscribe(
  /* this.usuarioservice.getAllUsuarios(`${this.url}/user/allusers`,!token?'':token).subscribe(  */

      (data: any): any => {
        this.usuarios = Object.values(data.usuario);
        console.log(this.usuarios);
      },
      error => console.log("Ha ocurrido un error en la llamada: ", error))


    //Capturamos todos los registros para saber la paginación
    this.usuarioservice.getAllUsuarios(`${this.url}/user/allusers`, !token ? '' : token).subscribe(

      (data): any => {
        this.paginado = Object.values(data).length;
        console.log(Object.values(data).length);
        this.itemsPaginado = Math.round(this.paginado / this.pageLimit)
        this.pageLimit = Math.round(this.paginado / 2)
      },
      error => console.log("Ha ocurrido un error en la llamada: ", error),
      () => {
        this.isLoading = false;
      })
  }

  deleteUsuario(id: number) {
    this.isLoading = true;
    if (confirm("Esta seguro que desea eliminar el usuario.")) {
      this.usuarioservice.deleteUsuario(`${this.url}/user/${id}`).subscribe(

        (data): any => {
          this.usuarios = this.usuarios.filter((usuario) => {
            return usuario.user_id !== id
          })
        }, error => console.log("Ha ocurrido un error en la llamada: ", error),
        () => {
          this.isLoading = false;
        })
    }
  }

  siguiente() {
    this.isLoading = true;
    if (this.contadorSaltos > this.itemsPaginado) {
      this.validarPaginado()
    } else {
      /* this.pageLimit = this.pageLimit + 10 */
      this.take += 6
      this.contadorSaltos += 1
      this.usuarioservice.navegacionUsuario(`${this.url}/user/allusers?limit=${this.pageLimit}&skip=${this.take}`).subscribe(

        (data): any => { this.usuarios = Object.values(data); console.log(data) },
        error => console.log("Ha ocurrido un error en la llamada: ", error),
        () => {
          this.isLoading = false;
        })
      this.validarPaginado()
    }
  }



  atras() {
    this.isLoading = true;
    if (this.contadorSaltos != 0) {
      this.take -= 6
      this.contadorSaltos -= 1
      this.usuarioservice.navegacionUsuario(`${this.url}/user/allusers?limit=${this.pageLimit}&skip=${this.take}`).subscribe(
        (data): any => { this.usuarios = Object.values(data); console.log(data) },
        error => console.log("Ha ocurrido un error en la llamada: ", error),
        () => {
          this.isLoading = false;
        })
      this.validarPaginado()
    }
  }

  validarPaginado() {
    //TODO: Paginado en la lista de usuarios inabilitado.(modificar);
    /* if (this.contadorSaltos == this.itemsPaginado) {
      document.getElementById('btnAtras').classList.remove('disabled')
      document.getElementById('btnSiguiente').classList.add('disabled')

    } else if (this.take < this.itemsPaginado) {
      document.getElementById('btnAtras').classList.add('disabled')
      document.getElementById('btnSiguiente').classList.remove('disabled')
    } else {
      document.getElementById('btnAtras').classList.remove('disabled')
      document.getElementById('btnSiguiente').classList.remove('disabled')
    } */
  }

}
