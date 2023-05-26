import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLogin = new BehaviorSubject<boolean>(false);

  //método que nos permitirá chequear si existe un token, en tal
  //caso retornará true
  private checkToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private checkUser(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  //método que nos permite establecer el token en el almacenamiento local
  //y enviar una señal del BehaviorSubject para establecer su nuevo valor en
  //true para indicar que estamos logueados
  login(token: string): void {
    localStorage.setItem('token', token);
    this.isLogin.next(true);
  }
  /* Save all user info */
  setCurrentUser(user: object): void {
    localStorage.setItem('currentUser', JSON.stringify({usuario:user}));
  }

  /* Save user id */
  setIdUser(id: string): void {
    localStorage.setItem('userId', JSON.stringify({Id:id}));
  }
  
  //método que nos permite recuperar el  usuario
  getCurrentUser(): string | null {
    return localStorage?.getItem("currentUser") ;
  }

  //método que nos permite recuperar el  id delusuario
  getUserId(): string | null {
    return localStorage?.getItem("userId") ;
  }

  //método que nos permite recuperar el  usuario
  getCurrentUserRol(): string | null {
    return localStorage?.getItem("currentUser") ;
  }

  getToken() {
    if (this.checkToken()) {
      return localStorage.getItem('token')
    }
    return "No hay token";
  }

   //método que nos permite eliminar el nombre de usuario
   private deleteCourrentUser() : void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  //método que nos permite romover el token almacenado y el nombre del
  //usuario actual y enviar una señal al BehaviorSubject para establecer
  //su nuevo valor, en este caso false para indicar que no estamos logueados
  logout(): void {    
    localStorage.clear()    
    this.isLogin.next(false);
  }

  //método que nos retorna el BehaviorSubject cómo un observable
  isLoggedIn(): Observable<boolean> {
    let logIn = new BehaviorSubject<boolean>(this.checkUser());    
    //Validacion si es admin
    return logIn
   /*  return this.isLogin.asObservable(); */
  }

  //método que nos retorna el BehaviorSubject admin cómo un observable
  /* isAdmin(): Observable<boolean> {
    return this.admin.asObservable();
  } */

  

}
