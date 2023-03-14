import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBtnPrimaryComponent } from './my-btn-primary.component';

describe('MyBtnPrimaryComponent', () => {
  let component: MyBtnPrimaryComponent;
  let fixture: ComponentFixture<MyBtnPrimaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBtnPrimaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBtnPrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
