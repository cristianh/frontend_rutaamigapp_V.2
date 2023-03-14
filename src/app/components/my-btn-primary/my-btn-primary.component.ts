import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-btn-primary',
  templateUrl: './my-btn-primary.component.html',
  styleUrls: ['./my-btn-primary.component.scss']
})
export class MyBtnPrimaryComponent {
  @Input() textoBoton: string | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }

}
