import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSalasComponent } from './detalle-salas.component';

describe('DetalleSalasComponent', () => {
  let component: DetalleSalasComponent;
  let fixture: ComponentFixture<DetalleSalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleSalasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleSalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
