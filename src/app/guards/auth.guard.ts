import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, private route: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise((resolve, reject) => {

      this.auth.isLoggedIn().subscribe(
        login => {
          console.log("HOLA")
          if (login) {
            resolve(true);
          } else {
            console.log('User is not logged in');
            this.route.navigate(['/']);
            resolve(false);
          }
        });
    });

  }

}
