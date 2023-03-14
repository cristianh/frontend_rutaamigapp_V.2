import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
//import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {

  constructor(private usuarioservice: UsuarioService) { }

  usuarios:Usuario[] = []
  paginado: number = 0
  itemsPaginado = 0
  contadorSaltos = 0
  pageLimit = 6
  take = 0
  loading = true
  //url = environment.API_URL;
  url = 'http://localhost:3000/api';
  

  ngOnInit(): void {

    //Realizamos la peticion de los usuarios
  /*   this.usuarioservice.getAllUsuarios(`${this.url}/usuario?limit=${this.pageLimit}&skip=${this.take}`).subscribe( */
  this.usuarioservice.getAllUsuarios(`${this.url}/usuario/allusers`).subscribe( 

      (data): any => { this.usuarios = Object.values(data); 
        //console.log(data.usuario); 
        this.loading = false },
      error => console.log("Ha ocurrido un error en la llamada: ", error))


    //Capturamos todos los registros para saber la paginación
    this.usuarioservice.getAllUsuarios(`${this.url}/usuario/allusers`).subscribe(

      (data): any => {
        this.paginado = Object.values(data).length;
        console.log(Object.values(data).length);
        this.itemsPaginado = Math.round(this.paginado / this.pageLimit)
        this.pageLimit = Math.round(this.paginado / 2)
      },
      error => console.log("Ha ocurrido un error en la llamada: ", error))
  }

  deleteUsuario(id: number) {

    if (confirm("Esta seguro que desea eliminar el usuario.")) {
      this.usuarioservice.deleteUsuario(`${this.url}/usuario/${id}`).subscribe(

        (data): any => {
          this.usuarios = this.usuarios.filter((usuario) => {
            return usuario.idusuario !== id
          })
        }, error => console.log("Ha ocurrido un error en la llamada: ", error))
    }



  }

  siguiente() {

    if (this.contadorSaltos > this.itemsPaginado) {
      this.validarPaginado()
    } else {
      /* this.pageLimit = this.pageLimit + 10 */
      this.take += 6
      this.loading = true
      this.contadorSaltos += 1
      this.usuarioservice.navegacionUsuario(`${this.url}/usuario?limit=${this.pageLimit}&skip=${this.take}`).subscribe(

        (data): any => { this.usuarios = Object.values(data); console.log(data); this.loading = false },
        error => console.log("Ha ocurrido un error en la llamada: ", error))
      this.validarPaginado()
    }
  }



  atras() {

    if (this.contadorSaltos != 0) {
      this.take -= 6
      this.loading = true
      this.contadorSaltos -= 1
      this.usuarioservice.navegacionUsuario(`${this.url}/usuario?limit=${this.pageLimit}&skip=${this.take}`).subscribe(
        (data): any => { this.usuarios = Object.values(data); console.log(data); this.loading = false },
        error => console.log("Ha ocurrido un error en la llamada: ", error))
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
