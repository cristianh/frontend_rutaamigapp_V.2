import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewPasswordComponent } from './user-new-password.component';

describe('UserNewPasswordComponent', () => {
  let component: UserNewPasswordComponent;
  let fixture: ComponentFixture<UserNewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNewPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
