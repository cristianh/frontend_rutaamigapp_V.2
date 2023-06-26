import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private accessToken = 'NDkyMjZjYmE2YTJhNzA5NDA4ZjhiZTIwMWQ3YWI2MTgwNTkwYTQ5NzE3NWU1N2UyNDNjNGZhNTQwZDE4ZDVmNw';
  private apiUrl = 'https://management-api.wonderpush.com/v1/deliveries';

  constructor(private http: HttpClient) { }

  upLoadFile(file:any){
    const formData: FormData = new FormData();
    formData.append('file', file);

    // Make a POST request to the server-side endpoint
    return this.http.post<any>('http://localhost:3000/api/uploadFile/uploadNotificacionImagen', formData);
  }

  sendNotificacion(mensaje: any,urlFileCloudinary:string) {
    let data:any;
    if(urlFileCloudinary==""){
      data = JSON.stringify(`{"alert":{"text":${mensaje.mensaje}}}`)
    }else{
      data = JSON.stringify(`{"alert": {"text": ${mensaje.mensaje}, "ios":{"attachments":[{"url":${urlFileCloudinary}}]}, "android":{"type":"bigPicture", "bigPicture":${urlFileCloudinary}}, "web":{"image":${urlFileCloudinary}}}}`)
    }
    
    
    const urlencoded = new URLSearchParams();
    urlencoded.append('targetSegmentIds', '@ALL');
    urlencoded.append('notification', data);


    let config:any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      responseType: 'text' as 'json' // adjust the responseType based on the API response
    }
    
    return this.http.post(this.apiUrl + '?accessToken=' + this.accessToken, urlencoded.toString(), config);
  }
}