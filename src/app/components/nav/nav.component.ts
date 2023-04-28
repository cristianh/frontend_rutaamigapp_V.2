import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  public user: any;
  public isMenuOpen: boolean = false;
 

  constructor(public auth: AuthService) {

  }

  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();
   
  }

  getUsuario() {
    return JSON.parse(this.user).usuario
  }

  getUsuarioImg() {
    return JSON.parse(this.user).imagen
  }

  toogleMenu(){
    this.isMenuOpen = !this.isMenuOpen
  }

//Crear un menu tipo hamburguesa en angular

}
