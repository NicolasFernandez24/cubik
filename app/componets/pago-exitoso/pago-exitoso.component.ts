import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reserva } from '../../models/reserva/reserva.model';
import { ReservaService } from '../../services/api-service-rerserva.service';
import { EquipoxReservaService } from '../../services/api-service-equipox-reserva.service';
import { Equipo } from '../../models/equipo/equipo.model';
import { PagoService } from '../../services/api-service-pago.service';
import { Usuario } from '../../models/usuario/usuario.model';
import { Sala } from '../../models/sala/sala.model';
import { ApiServiceUsuariosService } from '../../services/api-service-usuarios.service';
import { ApiServiceSalaService } from '../../services/api-service-sala.service';
@Component({
  selector: 'app-pago-exitoso',
  templateUrl: './pago-exitoso.component.html',
  styleUrl: './pago-exitoso.component.css'
})
export class PagoExitosoComponent {
  reserva:Reserva={
    id_usuario:0,
    id_sala:0,
    fecha:'',
    hora:'',
    duracion:2,
    alquila_equipo:false,
    pagada:false,
  }
  sala: Sala = {
    nombre: '',
    cantidad: 0,
    precio: 0,
    habilitada: true
  };
  usuario:Usuario={ }
  equiposDisponibles: Equipo[]  = []; 
  equipoSeleccionados: Equipo[]  = []; 
  montoTotal:number=0
  montoApagar:number=0
  constructor(private route: ActivatedRoute,private reservaService:ReservaService,private equipoxReservaService:EquipoxReservaService,private pago:PagoService,private usuarioService:ApiServiceUsuariosService,private salaService:ApiServiceSalaService) {}
  
  ngOnInit() {
    
    const reservaData = localStorage.getItem('reserva');
    const equipoSelecData=localStorage.getItem('equipoSelecionados');
    const equiposDispData=localStorage.getItem('equiposDisponibles');
    const montoTotalData=localStorage.getItem('montoTotal');
    const montoApagarData=localStorage.getItem('montoApagar');
    if(equipoSelecData && equiposDispData){
      this.equipoSeleccionados=JSON.parse(equipoSelecData)
      this.equiposDisponibles=JSON.parse(equiposDispData)
      localStorage.removeItem('equipoSelecionados');
      localStorage.removeItem('equiposDisponibles');
    }
    if (reservaData) {
      this.reserva = JSON.parse(reservaData);
      
      localStorage.removeItem('reserva');
    } 
    if(montoApagarData&&montoTotalData){
      this.montoTotal=JSON.parse(montoTotalData)
      this.montoApagar=JSON.parse(montoApagarData)
      localStorage.removeItem('montoTotal');
      localStorage.removeItem('montoApagar');
    }
    this.guardarReserva(this.reserva)
    this.CargarUsuario(this.reserva.id_usuario)
    this.loadSala();
  }

  guardarReserva(reserva: Reserva): void {
   
    console.log(reserva.alquila_equipo)
    console.log(this.equipoSeleccionados)


    if (reserva.id_promocion !== undefined) {
      this.reservaService.agregarReserva(reserva.id_usuario, reserva.id_sala, reserva.fecha, reserva.hora, reserva.duracion, reserva.alquila_equipo,reserva.pagada, reserva.id_promocion).subscribe(
        (res) => {
          const reservaId = res['reserva_id'];
          console.log(reservaId)
          if (reservaId !== undefined && this.reserva.alquila_equipo) {
          
            this.equipoSeleccionados.forEach(equipo => {
              if (equipo.id !== undefined) {
                this.equipoxReservaService.asignarEquipoAReserva(reservaId, equipo.id).subscribe(
                  () => {
                    console.log(`Equipo ${equipo.nombre} asignado a la reserva.`);
                  },
                  error => {
                    console.error(`Error al asignar el equipo ${equipo.nombre} a la reserva:`, error);
                  }
                );
              } else {
                console.error(`El equipo ${equipo.nombre} no tiene un ID definido.`);
              }
            });
          }
         
          console.log('Reserva guardada correctamente');
          this.guardarPago(reservaId,this.montoApagar,reserva.fecha,this.montoTotal)
        },
        error => {
          console.error('Error al guardar la reserva:', error);
        }
      );
    } else {
      this.reservaService.agregarReserva(reserva.id_usuario, reserva.id_sala, reserva.fecha, reserva.hora, reserva.duracion, reserva.alquila_equipo,reserva.pagada).subscribe(
        (res) => {
          const reservaId = res['reserva_id'];
          if (reservaId !== undefined && this.reserva.alquila_equipo ) {
            this.equipoSeleccionados.forEach(equipo => {
              if (equipo.id !== undefined) {
                this.equipoxReservaService.asignarEquipoAReserva(reservaId, equipo.id).subscribe(
                  () => {
                    console.log(`Equipo ${equipo.nombre} asignado a la reserva.`);
                  },
                  error => {
                    console.error(`Error al asignar el equipo ${equipo.nombre} a la reserva:`, error);
                  }
                );
              } else {
                console.error(`El equipo ${equipo.nombre} no tiene un ID definido.`);
              }
            });
          }
         
          console.log('Reserva guardada correctamente');
          this.guardarPago(reservaId,this.montoApagar,reserva.fecha,this.montoTotal)
        },
        error => {
          console.error('Error al guardar la reserva:', error);
        }
      );
    }
  }
  guardarPago(idReserva: number, monto: number, fechaPago: string,monto_total:number): void {
    this.pago.agregarPago(idReserva, monto, fechaPago,monto_total).subscribe(
      (res) => {
        console.log('Pago guardado correctamente:', res);
      },
      (error) => {
        console.error('Error al guardar el pago:', error);
      }
    );
  }
  CargarUsuario(userid:number){
    if(userid){
      this.usuarioService.obtenerUsuarioPorId(userid).subscribe(
        response => {

          this.usuario = response;
        },
        error => {
          console.error('Error al cargar usuario', error);
         
        }
      )
     }
  }
  loadSala(): void {
    this.salaService.getSalaById(this.reserva.id_sala).subscribe(
      sala => {
        this.sala = sala;
        
      },
      error => {
        console.error('Error al cargar la sala:', error);
      }
    );
  }
 
}
