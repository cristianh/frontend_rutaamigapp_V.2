import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-user-activate-acount',
  templateUrl: './user-activate-acount.component.html',
  styleUrls: ['./user-activate-acount.component.scss']
})
export class UserActivateAcountComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private usuarioservice: UsuarioService
    ){

  }


activar(){
  let usuario = {
    "id": this.route.snapshot.paramMap.get('id'),
    "token": this.route.snapshot.paramMap.get('token')
  }

  //SEND DATA TO SERVICES
  this.usuarioservice.activateAcoountUsuario('/auth/validateAccountUsuario', usuario).subscribe(
    //SEND NEW EMAIL
    (data: any): any => {

      if (data) {
        
        const toast = this.toastr.success(`La cuenta ha sido activada.`, "Correcto!", {
          progressAnimation: 'decreasing'
        });
        toast.onHidden.subscribe(() => {
          this.router.navigate(['/']);         
        });
      }
    },
    (error:any) => {
      /* this.mensajeError = true
      this.mensajeSuccess = false */
      console.log("Ha ocurrido un error en la llamada: ", error)
    })
  }

}
