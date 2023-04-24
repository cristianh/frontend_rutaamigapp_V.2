import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerUserResetPasswordComponent } from './container-user-reset-password.component';

describe('ContainerUserResetPasswordComponent', () => {
  let component: ContainerUserResetPasswordComponent;
  let fixture: ComponentFixture<ContainerUserResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerUserResetPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerUserResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
