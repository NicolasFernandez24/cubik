import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarSalaComponent } from './modificar-sala.component';

describe('ModificarSalaComponent', () => {
  let component: ModificarSalaComponent;
  let fixture: ComponentFixture<ModificarSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarSalaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
