import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnuncioComponent } from './form-anuncio.component';

describe('FormAnuncioComponent', () => {
  let component: FormAnuncioComponent;
  let fixture: ComponentFixture<FormAnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAnuncioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
