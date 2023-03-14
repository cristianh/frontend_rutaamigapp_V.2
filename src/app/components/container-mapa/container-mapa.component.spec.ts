import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerMapaComponent } from './container-mapa.component';

describe('ContainerMapaComponent', () => {
  let component: ContainerMapaComponent;
  let fixture: ComponentFixture<ContainerMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerMapaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
