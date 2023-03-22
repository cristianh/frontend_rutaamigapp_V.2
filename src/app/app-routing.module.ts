import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerListUsersComponent } from './components/container-list-users/container-list-users.component';
import { ContainerLoginComponent } from './components/container-login/container-login.component';
import { ContainerMapaComponent } from './components/container-mapa/container-mapa.component';
import { ContainerRegisterComponent } from './components/container-register/container-register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { FooterComponent } from './components/footer/footer.component';
//DASHBOARD ADMIN
import { LayoutComponent } from './components/layout/layout.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { NavDashboardComponent } from './components/nav-dashboard/nav-dashboard.component';
import { NavComponent } from './components/nav/nav.component';
import { ResgisterUserListComponent } from './components/resgister-user-list/resgister-user-list.component';
import { SettingsUserComponent } from './components/settings-user/settings-user.component';
import { UserNotifityComponent } from './components/user-notifity/user-notifity.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserRoutesComponent } from './components/user-routes/user-routes.component';

const routes: Routes = [
  { path: '', component: ContainerLoginComponent },
  { path: 'registrar', component: ContainerRegisterComponent },
  {
    path: 'dashboard', component: LayoutComponent,
    children: [
      { path: '',component: NavComponent, outlet: "header" },
      { path: '',component: NavDashboardComponent, outlet: "sidenav" },
      { path: 'listar-usuarios', component: ListUsersComponent},
      { path: 'perfil-usuario', component: UserProfileComponent},
      { path: 'mensaje-usuario', component: UserNotifityComponent},
      { path: 'listar-favoritos-usuarios', component: FavoritosComponent},
      { path: 'rutas-usuario', component: UserRoutesComponent},
      { path: 'configuracion-usuario', component: SettingsUserComponent},
      { path: 'nuevo-usuario', component: ResgisterUserListComponent},
      { path: '', component: FooterComponent, outlet: "footer" },
    ]
  },


  { path: 'mapa', component: ContainerMapaComponent },
  /* { path: '**',pathMatch: 'full', component: ContainerLoginComponent } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
