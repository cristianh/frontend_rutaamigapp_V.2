import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNotifityComponent } from './user-notifity.component';

describe('UserNotifityComponent', () => {
  let component: UserNotifityComponent;
  let fixture: ComponentFixture<UserNotifityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNotifityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserNotifityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
