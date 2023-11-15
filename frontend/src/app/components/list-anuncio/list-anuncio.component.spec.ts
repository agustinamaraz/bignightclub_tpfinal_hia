import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnuncioComponent } from './list-anuncio.component';

describe('ListAnuncioComponent', () => {
  let component: ListAnuncioComponent;
  let fixture: ComponentFixture<ListAnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAnuncioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
