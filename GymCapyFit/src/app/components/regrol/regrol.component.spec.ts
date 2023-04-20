import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegrolComponent } from './regrol.component';

describe('RegrolComponent', () => {
  let component: RegrolComponent;
  let fixture: ComponentFixture<RegrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegrolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
