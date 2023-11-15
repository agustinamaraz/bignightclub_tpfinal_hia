import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarclienteComponent } from './calendarcliente.component';

describe('CalendarclienteComponent', () => {
  let component: CalendarclienteComponent;
  let fixture: ComponentFixture<CalendarclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarclienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
