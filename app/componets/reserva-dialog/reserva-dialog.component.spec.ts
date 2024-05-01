import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaDialogComponent } from './reserva-dialog.component';

describe('ReservaDialogComponent', () => {
  let component: ReservaDialogComponent;
  let fixture: ComponentFixture<ReservaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservaDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
