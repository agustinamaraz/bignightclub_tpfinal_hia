import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosMedicosHomeComponent } from './datos-medicos-home.component';

describe('DatosMedicosHomeComponent', () => {
  let component: DatosMedicosHomeComponent;
  let fixture: ComponentFixture<DatosMedicosHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosMedicosHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosMedicosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
