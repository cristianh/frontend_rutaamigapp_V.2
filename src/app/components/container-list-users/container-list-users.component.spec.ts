import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerListUsersComponent } from './container-list-users.component';

describe('ContainerListUsersComponent', () => {
  let component: ContainerListUsersComponent;
  let fixture: ComponentFixture<ContainerListUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerListUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
