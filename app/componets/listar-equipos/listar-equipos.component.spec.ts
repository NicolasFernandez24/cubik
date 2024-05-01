import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEquiposComponent } from './listar-equipos.component';

describe('ListarEquiposComponent', () => {
  let component: ListaEquiposComponent;
  let fixture: ComponentFixture<ListaEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaEquiposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
