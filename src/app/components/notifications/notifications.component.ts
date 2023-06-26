import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent{

  formMensaje!: FormGroup;
  isLoading:boolean = false;
  imgDemo:any = "https://res.cloudinary.com/dl7oqoile/image/upload/v1687732477/file_yedsot.png"
  
  fileSrc:any =""
  fileUrlCloudinaryUploadSrc:any =""

  mensaje:any={
    titulo:"",
    mensaje:"",
    fileImage: ""
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private notification: NotificacionService
    ) {}

  ngOnInit() {

      this.formMensaje = this.fb.group({
        tituloMensaje: ['', Validators.required],
        mensajebody: ['', [Validators.required]]        
      })
  }
  
  onLoadFile(){   
    this.notification.upLoadFile(this.fileSrc).subscribe(
      (response:any) => {
        console.log(response);
        this.fileUrlCloudinaryUploadSrc = response.url

        const {status} = response

        let reader = new FileReader();
		      reader.readAsDataURL(this.fileSrc);
		
		      reader.onload = (_event) => {
			      this.imgDemo = reader.result; 
		    }
        

        if(status==='¡Archivo cargado correctamente!'){
          console.log(status)
          this.toastr.success(status,"¡Correcto!");
        }
       
      },
      (error) => {
        console.error(error);
        this.toastr.error("Error al cargar el archivo.","Error!");
        
      });
   
  }
  onFileSelected(event:any): void {
    // Store the selected file
    this.fileSrc = event.target?.files.item(0);
  }


  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  onSubmit(){
    if (!this.formMensaje.valid) {
      
      this.toastr.error("Error en el formulario","Revise por favor");
    } else {

      this.mensaje= {
        titulo: this.formMensaje.value.tituloMensaje,
        mensaje: this.formMensaje.value.mensajebody,
        fileImage: this.fileSrc
      }
     
      this.notification.sendNotificacion(this.mensaje,this.fileUrlCloudinaryUploadSrc).subscribe(
        (data: any): any => {
  
        const {success} =  JSON.parse(data)
        console.log(success)
                    
        if(success){
          this.toastr.success("Notificacion enviada con exito.","¡Atencion!");
         }
       
          this.mensaje= {
            titulo: "",
            mensaje: "",
            fileImage: ""
          }     
          
          this.isLoading = false
        },
        (err) => { 
          this.toastr.error("Error al enviar la notificación","Error!");
          console.log("Ha ocurrido un error en la llamada: ", err)
        }
      );
      

      
    }
  }

}
