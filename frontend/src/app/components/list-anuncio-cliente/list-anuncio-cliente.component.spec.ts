import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnuncioClienteComponent } from './list-anuncio-cliente.component';

describe('ListAnuncioClienteComponent', () => {
  let component: ListAnuncioClienteComponent;
  let fixture: ComponentFixture<ListAnuncioClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAnuncioClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAnuncioClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
