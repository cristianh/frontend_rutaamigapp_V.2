import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerLoginComponent } from './components/container-login/container-login.component';
import { ContainerMapaComponent } from './components/container-mapa/container-mapa.component';

const routes: Routes = [
  { path: 'login', component: ContainerLoginComponent },
  { path: 'mapa', component: ContainerMapaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
