import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContactoComponent } from './list-contacto.component';

describe('ListContactoComponent', () => {
  let component: ListContactoComponent;
  let fixture: ComponentFixture<ListContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
