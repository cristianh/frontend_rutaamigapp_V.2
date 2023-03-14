import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ContainerLoginComponent } from './components/container-login/container-login.component';
import { LoginComponent } from './components/login/login.component';
import { MyBtnPrimaryComponent } from './components/my-btn-primary/my-btn-primary.component';
import { NavComponent } from './components/nav/nav.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { ContainerMapaComponent } from './components/container-mapa/container-mapa.component';
import { ContainerRegisterComponent } from './components/container-register/container-register.component';
import { RegisterNewUserComponent } from './components/register-new-user/register-new-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ContainerListUsersComponent } from './components/container-list-users/container-list-users.component';

const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ContainerLoginComponent,
    LoginComponent,
    MyBtnPrimaryComponent,
    NavComponent,
    MapaComponent,
    ContainerMapaComponent,
    ContainerRegisterComponent,
    RegisterNewUserComponent,
    ListUsersComponent,
    ContainerListUsersComponent
  ],
  imports: [
    [BrowserModule, SocketIoModule.forRoot(config)],
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
