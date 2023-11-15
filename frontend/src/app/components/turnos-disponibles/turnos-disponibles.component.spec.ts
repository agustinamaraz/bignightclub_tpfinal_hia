import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosDisponiblesComponent } from './turnos-disponibles.component';

describe('TurnosDisponiblesComponent', () => {
  let component: TurnosDisponiblesComponent;
  let fixture: ComponentFixture<TurnosDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosDisponiblesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnosDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
