import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  configUrl = 'assets/config.json';
  baseUrl=environment.API_URL;

  constructor(private http: HttpClient,private auth:AuthService) { }

  getAllUsuarios(route: string,token:string) {

    console.log(token); 
    let config:any = {
      responseType: "json"
    }
    if (token){
      const header = new HttpHeaders().set('api-token', ` ${token}`);
      config["headers"] = header;
    }
    console.log(config);
    
    return this.http.get(route,config);
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
