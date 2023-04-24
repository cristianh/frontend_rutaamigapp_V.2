import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerUserNewPasswordComponent } from './container-user-new-password.component';

describe('ContainerUserNewPasswordComponent', () => {
  let component: ContainerUserNewPasswordComponent;
  let fixture: ComponentFixture<ContainerUserNewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerUserNewPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerUserNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
