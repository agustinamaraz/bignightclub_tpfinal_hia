import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosmedicosFormComponent } from './datosmedicos-form.component';

describe('DatosmedicosFormComponent', () => {
  let component: DatosmedicosFormComponent;
  let fixture: ComponentFixture<DatosmedicosFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosmedicosFormComponent]
    });
    fixture = TestBed.createComponent(DatosmedicosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
