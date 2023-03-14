import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { AuthService } from 'src/app/services/auth.service';
/* import { environment } from '../../environments/environment'; */

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  configUrl = 'assets/config.json';
  //baseUrl=environment.API_URL;
  baseUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient,private auth:AuthService) { }

  getAllUsuarios(route: string) {

    let reqHeaders = new HttpHeaders();

    reqHeaders.append('api-token', this.auth.getToken() ?? '');
    
    return this.http.get(route,{
      headers: reqHeaders,
      responseType: "json",
      withCredentials: true,
    })
  }

  saveUsuario(route: string, usuariodata: Usuario) {
    let config: any = {
      responseType: "json"
    }

    return this.http.post(`${this.baseUrl}${route}`, usuariodata, config);
  }

  deleteUsuario(route: string) {
    let config: any = {
      responseType: "json"
    }
    return this.http.delete(route, config);
  }

  navegacionUsuario(route: string) {
    return this.http.get(route)
  }

  loginUsuario(route: string, usuario: Usuario) {
    let config: any = {
      responseType: "json"
    }
    return this.http.post(`${this.baseUrl}${route}`, usuario, config);
  }

  resetPassword(route: string, correo: any) {
    let config: any = {
      responseType: "json"
    }
    return this.http.post(`${this.baseUrl}${route}`, correo, config);
  }

  updatePasswordUsuario(route: string, data: any) {
    let config: any = {
      responseType: "json",

    }
    return this.http.post(`${this.baseUrl}${route}`, data, config);
  }
}
