import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgisterUserListComponent } from './resgister-user-list.component';

describe('ResgisterUserListComponent', () => {
  let component: ResgisterUserListComponent;
  let fixture: ComponentFixture<ResgisterUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResgisterUserListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResgisterUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
