import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerListUsersComponent } from './components/container-list-users/container-list-users.component';
import { ContainerLoginComponent } from './components/container-login/container-login.component';
import { ContainerMapaComponent } from './components/container-mapa/container-mapa.component';
import { ContainerRegisterComponent } from './components/container-register/container-register.component';
import { ContainerUserNewPasswordComponent } from './components/container-user-new-password/container-user-new-password.component';
import { ContainerUserResetPasswordComponent } from './components/container-user-reset-password/container-user-reset-password.component';
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
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserNewPasswordComponent } from './components/user-new-password/user-new-password.component';
import { UserNotifityComponent } from './components/user-notifity/user-notifity.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserRoutesComponent } from './components/user-routes/user-routes.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  { path: '', component: ContainerLoginComponent,canActivate:[AuthGuard] },
  { path: 'registrar', component: ContainerRegisterComponent },
  { path: 'reset-password', component: ContainerUserResetPasswordComponent },
  { path: 'reset-new-password', component: UserNewPasswordComponent }, // ruta para ver la ventana rapidamente.
  { path: 'new-password/:id/:token', component: ContainerUserNewPasswordComponent },
  {
    path: 'dashboard', component: LayoutComponent, canActivate:[AuthGuard],
    children: [
      { path: '',component: NavComponent, outlet: "header" },
      { path: '',component: NavDashboardComponent, outlet: "sidenav" },
      { path: 'listar-usuarios', component: ListUsersComponent},
      { path: 'actualizar-usuario/:id', component: UserEditComponent},
      { path: 'perfil-usuario', component: UserProfileComponent},
      { path: 'mensaje-usuario', component: UserNotifityComponent},
      { path: 'listar-favoritos-usuarios', component: FavoritosComponent},
      { path: 'rutas-usuario', component: UserRoutesComponent},
      { path: 'configuracion-usuario', component: SettingsUserComponent},
      { path: 'nuevo-usuario', component: ResgisterUserListComponent},
      { path: 'notificaciones', component: NotificationsComponent},
      { path: '', component: FooterComponent, outlet: "footer" },
    ]
  },


  { path: 'mapa', component: ContainerMapaComponent },
  /* { path: '**',pathMatch: 'full', component: ContainerLoginComponent } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
