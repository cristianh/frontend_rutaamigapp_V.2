import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerListUsersComponent } from './components/container-list-users/container-list-users.component';
import { ContainerLoginComponent } from './components/container-login/container-login.component';
import { ContainerMapaComponent } from './components/container-mapa/container-mapa.component';
import { ContainerRegisterComponent } from './components/container-register/container-register.component';

const routes: Routes = [
  { path: 'login', component: ContainerLoginComponent },
  { path: 'registrar', component: ContainerRegisterComponent },
  { path: 'listar-usuarios', component: ContainerListUsersComponent },
  { path: 'mapa', component: ContainerMapaComponent },
  { path: '**', component: ContainerLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
