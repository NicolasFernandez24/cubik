import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModificarSalaComponent } from './crear-modificar-sala.component';

describe('CrearModificarSalaComponent', () => {
  let component: CrearModificarSalaComponent;
  let fixture: ComponentFixture<CrearModificarSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearModificarSalaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearModificarSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
