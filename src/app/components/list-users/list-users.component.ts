import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare let alertify:any
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {

  constructor(
    private router: Router,
    private usuarioservice: UsuarioService,
    private auth: AuthService,
    private toastr: ToastrService
  ) { }

  usuarios: any;
  usuariosCopy: any;
  paginado: number = 10
  itemsPaginado: number = 0
  contadorSaltos: number = 0
  pageLimit: number = 5
  take: number = 0
  isLoading: boolean = false;
  token: string | null = "";

  //FIND
  usuarioFind: string = ""
  isFind: boolean = false

  url = environment.API_URL;
  //url = 'http://localhost:3000/api';


  ngOnInit(): void {    
    this.token = this.auth.getToken()
    this.isLoading = true;


    //Capturamos todos los registros para saber la paginación
    this.usuarioservice.getAllUsuarios(`${this.url}/user/allusers?limit=${this.pageLimit}&skip=${this.take}`, !this.token ? '' : this.token).subscribe(

      (data: any): any => {

        const { usuario, totalUsersPage, limit, totalUsers } = data
        this.usuarios = usuario;
        this.usuarios= this.usuarios.filter((user:any)=>{
          return user.user_status==true
        })
        this.usuarios = this.usuarios.reverse()
        this.paginado = totalUsersPage / totalUsers
        this.itemsPaginado = Math.round(this.paginado)
        alert(this.itemsPaginado)
      },
      error => console.log("Ha ocurrido un error en la llamada: ", error),
      () => {
        this.isLoading = false;
      })
  }

  deleteUsuario(id: number) {
    this.isLoading = true;
    alertify.confirm('labels changed!').set('labels', {ok:'Aceptar', cancel:'Cancelar'}); 
    alertify.confirm("¡Atención!","¿Seguro que desea eliminar el usuario?",
    ()=>{
      this.usuarioservice.deleteUsuario(`/user/${id}`).subscribe(

        (data:any): any => {
          console.log(data)

          this.toastr.success(`${data.status}`, "¡Correcto!");

          this.usuarios = this.usuarios.filter((usuario: { user_id: number; }) => {
            return usuario.user_id !== id
          })

          

        }, error => console.log("Ha ocurrido un error en la llamada: ", error),
        () => {
          this.isLoading = false;
        })
    },
    ()=>{
      this.isLoading = false;
    })
   
  }

  updateUrlUser(url: string, data: string) {
    this.router.navigate([url, data]);
  }

  onCopyArray() {
    this.usuariosCopy = [...this.usuarios]
    console.log(this.usuariosCopy)
  }

  onRestoryCopy() {
    this.usuarios = this.usuariosCopy
    console.log(this.usuarios)
    this.usuariosCopy = []
  }

  onLimpiar() {

    this.onRestoryCopy()
    this.isFind = true
    this.usuarioFind = ''
  }

  onFindUser(event: Event) {
    event.preventDefault()
    this.onCopyArray()
    this.usuarioservice.findUsuarioByEmail(`/user/buscarporemail`, this.usuarioFind.trim(),!this.token ? '' : this.token).subscribe(
      (data: any): any => {
        console.log(data.length) 
        if (data.length>=1) {
                   
          this.usuarios = data;
         /*  this.usuarios = this.usuarios.reverse() */
          this.isFind = true
        } else {

          this.isFind = false
          this.toastr.info(`Usuario con correo '${this.usuarioFind}', no encontrado`, "¡Atencion!");

        }



      },
      error => console.log("Ha ocurrido un error en la llamada: ", error),
      () => {
        this.isLoading = false;
      })



  }


  saltarPagina(page: number) {
    this.take = page
    this.siguiente()
  }

  siguiente() {
    this.isLoading = true;
    if (this.contadorSaltos < this.itemsPaginado) {

    } else {
      this.take += 1
      this.contadorSaltos += 1
      this.usuarioservice.navegacionUsuario(`${this.url}/user/allusers?limit=${this.pageLimit}&skip=${this.take}`, !this.token ? '' : this.token).subscribe(

        (data: any): any => {
          const { usuario, totalUsersPage, limit, totalUsers } = data
          this.usuarios = usuario;
          this.usuarios = this.usuarios.reverse()

        },
        error => console.log("Ha ocurrido un error en la llamada: ", error),
        () => {
          this.isLoading = false;
        })
      this.validarPaginado()
    }
  }



  atras() {

    if (this.contadorSaltos != 0) {
      this.isLoading = true;
      this.take -= 1
      this.contadorSaltos -= 1
      this.usuarioservice.navegacionUsuario(`${this.url}/user/allusers?limit=${this.pageLimit}&skip=${this.take}`, !this.token ? '' : this.token).subscribe(
        (data: any): any => {
          const { usuario, totalUsersPage, limit, totalUsers } = data
          this.usuarios = usuario;
          this.usuarios = this.usuarios.reverse()
        },
        error => console.log("Ha ocurrido un error en la llamada: ", error),
        () => {
          this.isLoading = false;
        })
      this.validarPaginado()
    }
  }

  validarPaginado() {

  }

}
