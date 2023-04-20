import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinEmployeeComponent } from './checkin-employee.component';

describe('CheckinEmployeeComponent', () => {
  let component: CheckinEmployeeComponent;
  let fixture: ComponentFixture<CheckinEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckinEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckinEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
