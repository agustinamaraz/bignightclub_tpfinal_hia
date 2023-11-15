import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosmedicosLisComponent } from './datosmedicos-lis.component';

describe('DatosmedicosLisComponent', () => {
  let component: DatosmedicosLisComponent;
  let fixture: ComponentFixture<DatosmedicosLisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosmedicosLisComponent]
    });
    fixture = TestBed.createComponent(DatosmedicosLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
