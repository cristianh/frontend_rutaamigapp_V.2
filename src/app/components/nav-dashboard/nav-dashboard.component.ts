import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router"
@Component({
  selector: 'app-nav-dashboard',
  templateUrl: './nav-dashboard.component.html',
  styleUrls: ['./nav-dashboard.component.scss']
})
export class NavDashboardComponent {

  constructor(private auth:AuthService,private router: Router){}

  onLogOut(){
    this.auth.logout()
    this.router.navigate([''])
  }

}
