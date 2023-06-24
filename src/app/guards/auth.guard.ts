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
      
      if (state.url === "/dashboard/listar-usuarios" && !localStorage.getItem('currentUser')) {
        this.route.navigate(['/']);
        resolve(true);
      }

      if (state.url === "/" && localStorage.getItem('currentUser')) {
        this.route.navigate(['/dashboard/listar-usuarios']);
        resolve(true);
      }

      resolve(true);



    });

  }

}
