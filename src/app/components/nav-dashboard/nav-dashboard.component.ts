import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BrowserDetectorService } from 'src/app/services/browser-detector.service';

import { Router } from "@angular/router"



@Component({
  selector: 'app-nav-dashboard',
  templateUrl: './nav-dashboard.component.html',
  styleUrls: ['./nav-dashboard.component.scss']
})
export class NavDashboardComponent implements OnInit {

  userRol:any=""
  isMobile:boolean= true

  constructor(private browserDetect:BrowserDetectorService,private auth:AuthService,private router: Router){}

  ngOnInit(): void {
    this.userRol = this.auth.getCurrentUser();   
    this.isMobile = this.browserDetect.getBrowserName()
  }

  getUserRol() {
    return JSON.parse(this.userRol).usuario.rol
  }


  onLogOut(){
    this.auth.logout()
    this.router.navigate([''])
  }

}
