import { Component, OnInit } from '@angular/core';
import { PromocionService } from '../../services/api-service-promocion.service';

@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.css']
})
export class PromocionComponent implements OnInit {
  promociones: any[] = [];
  nombre: string = '';
  descripcion: string = '';
  tipoDescuento: string = '';
  duracionAdicional: number = 0;
  descuento: number = 0;
  isEditing: boolean = false;
  promocionId?: number;
  habilitada:boolean=false;
  
  constructor(private promocionService: PromocionService) {}

  ngOnInit(): void {
    this.cargarPromociones();
  }

  cargarPromociones(): void {
    this.promocionService.getAllPromciones().subscribe(
      (response: any) => {
        this.promociones = response;
      },
      error => {
        console.error('Error al cargar las promociones:', error);
      }
    );
  }

  editarPromocion(promocion: any): void {
    this.isEditing = true;
    this.promocionId = promocion.id;
    this.nombre = promocion.nombre;
    this.descripcion = promocion.descripcion;
    this.tipoDescuento = promocion.tipo_descuento;
    this.duracionAdicional = promocion.duracion_adicional;
    this.descuento = promocion.descuento;
    this.habilitada = promocion.habilitada;
}

agregarPromocion(): void {
    if (this.isEditing) {
        this.actualizarPromocion();
    } else {
        this.nuevaPromocion();
    }
}

nuevaPromocion(): void {
    this.promocionService.agregarPromocion(this.nombre, this.descripcion, this.tipoDescuento, this.duracionAdicional, this.descuento, this.habilitada)
      .subscribe(
        response => {
          console.log('Promoción agregada exitosamente');
          this.limpiarCampos();
          this.cargarPromociones();
        },
        error => {
          console.error('Error al agregar la promoción:', error);
        }
      );
}

actualizarPromocion(): void {
    if (this.promocionId) {
        this.promocionService.actualizarPromocion(this.promocionId, this.nombre, this.descripcion, this.tipoDescuento, this.duracionAdicional, this.descuento, this.habilitada)
            .subscribe(
                response => {
                    console.log('Promoción actualizada exitosamente');
                    this.limpiarCampos();
                    this.cargarPromociones();
                    this.isEditing = false;
                },
                error => {
                    console.error('Error al actualizar la promoción:', error);
                }
            );
    }
}

limpiarCampos(): void {
    this.nombre = '';
    this.descripcion = '';
    this.tipoDescuento = '';
    this.duracionAdicional = 0;
    this.descuento = 0;
    this.habilitada = false;
}

  eliminarPromocion(promocionId: number): void {
    this.promocionService.eliminarPromocion(promocionId)
      .subscribe(
        response => {
          console.log('Promoción eliminada exitosamente');
          this.cargarPromociones();
        },
        error => {
          console.error('Error al eliminar la promoción:', error);
        }
      );
  }

}
