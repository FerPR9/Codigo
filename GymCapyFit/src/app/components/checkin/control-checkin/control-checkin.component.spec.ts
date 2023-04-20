import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCheckinComponent } from './control-checkin.component';

describe('ControlCheckinComponent', () => {
  let component: ControlCheckinComponent;
  let fixture: ComponentFixture<ControlCheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlCheckinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
