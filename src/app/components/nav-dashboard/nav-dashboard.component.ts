import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-nav-dashboard',
  templateUrl: './nav-dashboard.component.html',
  styleUrls: ['./nav-dashboard.component.scss']
})
export class NavDashboardComponent implements OnInit {

  userRol:any=""

  constructor(private auth:AuthService,private router: Router){}

  ngOnInit(): void {
    this.userRol = this.auth.getCurrentUser();   
  }

  getUserRol() {
    return JSON.parse(this.userRol).usuario.rol
  }


  onLogOut(){
    this.auth.logout()
    this.router.navigate([''])
  }

}
