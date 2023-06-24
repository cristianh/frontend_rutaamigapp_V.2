import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-my-btn-primary',
  templateUrl: './my-btn-primary.component.html',
  styleUrls: ['./my-btn-primary.component.scss']
})
export class MyBtnPrimaryComponent {
  //my-btn-primary
  @Input() textoBoton: string | undefined;
  @Input() classBoton: string | undefined = "my-btn-primary";
 
  
  constructor() { }

  ngOnInit(): void {
    
   
   
  }

 

}
