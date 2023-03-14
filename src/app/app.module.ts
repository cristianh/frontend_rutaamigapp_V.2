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

const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ContainerLoginComponent,
    LoginComponent,
    MyBtnPrimaryComponent,
    NavComponent,
    MapaComponent,
    ContainerMapaComponent
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
