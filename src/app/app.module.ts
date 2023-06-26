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
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavDashboardComponent } from './components/nav-dashboard/nav-dashboard.component';
import { ContentComponent } from './components/content/content.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { UserRoutesComponent } from './components/user-routes/user-routes.component';
import { SettingsUserComponent } from './components/settings-user/settings-user.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserNotifityComponent } from './components/user-notifity/user-notifity.component';
import { ResgisterUserListComponent } from './components/resgister-user-list/resgister-user-list.component';

//TOASTR NOTIFICATION
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserResetPasswordComponent } from './components/user-reset-password/user-reset-password.component';
import { UserNewPasswordComponent } from './components/user-new-password/user-new-password.component';
import { ContainerUserResetPasswordComponent } from './components/container-user-reset-password/container-user-reset-password.component';
import { ContainerUserNewPasswordComponent } from './components/container-user-new-password/container-user-new-password.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

const config: SocketIoConfig = {
  url: 'https://socket-maptracker.onrender.com/', options: {
    transports: ['websocket']
  }
};



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
    ContainerListUsersComponent,
    FooterComponent,
    LayoutComponent,
    NavDashboardComponent,
    ContentComponent,
    DashboardComponent,
    FavoritosComponent,
    UserRoutesComponent,
    SettingsUserComponent,
    UserProfileComponent,
    UserNotifityComponent,
    ResgisterUserListComponent,
    UserResetPasswordComponent,
    UserNewPasswordComponent,
    ContainerUserResetPasswordComponent,
    ContainerUserNewPasswordComponent,
    PreloaderComponent,
    UserEditComponent,
    NotificationsComponent
  ],
  imports: [
    [BrowserModule, SocketIoModule.forRoot(config)],
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressAnimation: 'increasing',
      progressBar: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
