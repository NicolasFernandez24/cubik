import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap'; 
import { ReservaService } from '../../services/api-service-rerserva.service';
import { ApiServiceUsuariosService } from '../../services/api-service-usuarios.service';
import { Usuario } from '../../models/usuario/usuario.model';
import { AuthenticationService } from '../../services/authentication.service';
import { ApiServiceSalaService } from '../../services/api-service-sala.service';
import { Sala } from '../../models/sala/sala.model';
import { EquipoxReservaService } from '../../services/api-service-equipox-reserva.service';
import { EquipoService } from '../../services/api-service-equipo.service';
import { Equipo } from '../../models/equipo/equipo.model';
import { Router } from '@angular/router';
import { PagoService } from '../../services/api-service-pago.service';

@Component({
  selector: 'app-reserva-dialog',
  templateUrl: './reserva-dialog.component.html',
  styleUrl: './reserva-dialog.component.css'
})
export class ReservaDialogComponent  implements OnInit {
  reservas: any[] = [];
  usuario:Usuario={ };
  nuevaFecha: string = '';
  nuevaHora: string = '';
  reservaIdModificar: number | undefined;
  usuariobyreserva:Usuario={ };
  sala: Sala = {
    nombre: '',
    cantidad: 0,
    precio: 0,
    habilitada: true
  };
  equipo:Equipo={
    nombre:'',
    precio:0,
    habilitada:false,
  }
  userid:number | null=0;
  salaIdSeleccionada: number = 0;
  fechasDisponibles: Date[] = [];
  horariosDisponibles: string[] = [];
  fechaSeleccionada: NgbDateStruct | null = null;
  horaSeleccionada: string | null = null; 
  minDate: Date = new Date();
  currentYear: number;
  currentMonth: number;
  currentDay: number;
  @ViewChild('modificarReservaModal') modificarReservaModal!: TemplateRef<any>;

  constructor( private modalService: NgbModal,private reservaService: ReservaService,private usuarioService:ApiServiceUsuariosService,private Auth:AuthenticationService,private salaService:ApiServiceSalaService,private equipoReservaService:EquipoxReservaService,private equipoService:EquipoService,private router: Router,private pagoservice:PagoService,private calendar: NgbCalendar) {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth() + 1;
    this.currentDay = today.getDate();
   }

  ngOnInit(): void {
    this.obtenerReservas();
    const userIdlo = localStorage.getItem('userId');
    if(userIdlo)
    this.userid=JSON.parse(userIdlo)
      if(this.userid)
      this.CargarUsuario(this.userid);
  }

  obtenerReservas() {
    this.reservaService.obtenerReserva().subscribe(
      (reservas: any[]) => {
        this.reservas = reservas;
        const fechaActual = new Date();
        
        this.reservas = this.reservas.filter(reserva => new Date(reserva.fecha) > fechaActual);
        this.reservas.forEach(reserva => {
          if (new Date(reserva.fecha) <= fechaActual) {
            this.eliminarReserva(reserva.id);
          }
        });
        this.obtenerUsuarios();
        this.obtenerSalas();
        this.obtenerPagosPorReservas();
        this.reservas.forEach(reserva => {
          if (reserva.alquila_equipo ) {
            this.obtenerEquiposPorReserva(reserva.id);
          }
        });
        
        
      },
      (error) => {
        console.error('Error al obtener las reservas:', error);
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
  obtenerUsuarios() {
    this.reservas.forEach((reserva) => {
      this.usuarioService.obtenerUsuarioPorId(reserva.id_usuario).subscribe(
        (usuario: Usuario) => {
          reserva.usuario = usuario;
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    });
  }

  obtenerSalas() {
    this.reservas.forEach((reserva) => {
      this.salaService.getSalaById(reserva.id_sala).subscribe(
        (sala: Sala) => {
          reserva.sala = sala;
        },
        (error) => {
          console.error('Error al obtener la sala:', error);
        }
      );
    });
  }
  obtenerEquiposPorReserva(idReserva: number) {
    this.equipoReservaService.getEquiposPorReserva(idReserva).subscribe(
      (equiposID: any[]) => {
        equiposID.forEach(equipoid => {
         
          this.obtenerInformacionEquipo(idReserva,equipoid.idequipo);
        });
      },
      (error) => {
        console.error('Error al obtener los equipos por reserva:', error);
      }
    );
  }
  obtenerInformacionEquipo(idReserva: number, equipoid: any) {
    this.equipoService.getEquipoById(equipoid).subscribe(
      (equipoInfo: any) => {
        const equipo: Equipo = {
          nombre: equipoInfo.nombre,
          imagen: equipoInfo.imagen,
          precio: 0,
          habilitada: false,
        };
       
        const reserva = this.reservas.find(reserva => reserva.id === idReserva);
        if (reserva) {
          
          if (!reserva.equipos) {
            reserva.equipos = [];
          }
          
          reserva.equipos.push(equipo);
        }
      },
      (error) => {
        console.error('Error al obtener información del equipo:', error);
      }
    );
  }
  marcarComoPagada(idReserva: number) {
    this.reservaService.marcarReservaComoPagada(idReserva).subscribe(
      response => {
        const reserva = this.reservas.find(reserva => reserva.id === idReserva);
        if (reserva) {
          reserva.pagada = true;
        }
        console.log('Reserva marcada como pagada:', response);
      },
      error => {
        console.error('Error al marcar la reserva como pagada:', error);
      }
    );
  }
  limpiarHistorial(): void {

    this.reservas = [];
  }
  obtenerPagosPorReservas() {
    this.reservas.forEach((reserva) => {
      this.pagoservice.getPagosPorReserva(reserva.id).subscribe(
        (pagos: any[]) => {
          reserva.pagos = pagos;
          console.log(reserva.pagos)
        },
        (error) => {
          console.error('Error al obtener los pagos por reserva:', error);
        }
      );
    });
  }
  eliminarReserva(idReserva: number) {
    
    this.equipoReservaService.eliminarEquipoxReservaPorReserva(idReserva).subscribe(
      () => {
      
        this.pagoservice.eliminarPagosPorReserva(idReserva).subscribe(
          () => {
          
            this.reservaService.eliminarReserva(idReserva).subscribe(
              () => {
               console.log("Reserva Eliminada correctamente")
               this.reservas = this.reservas.filter(reserva => reserva.id !== idReserva);
              },
              (error) => {
                console.error('Error al eliminar la reserva:', error);
              }
            );
          },
          (error) => {
            console.error('Error al eliminar los pagos asociados a la reserva:', error);
          }
        );
      },
      (error) => {
        console.error('Error al eliminar EquipoxReserva asociado a la reserva:', error);
      }
    );
  }
  openModificarReservaModal(reservaId: number, salaId: number): void {
    this.reservaIdModificar = reservaId;
    this.salaIdSeleccionada = salaId; 
    this.modalService.open(this.modificarReservaModal, { size: 'lg' });
  
 
    this.loadFechasDisponibles();
  }

  cerrarModificarReservaModal(): void {
    this.nuevaFecha = '';
    this.nuevaHora = '';
    this.reservaIdModificar = undefined;
    this.modalService.dismissAll();
  }

  modificarReserva(): void {
    if (this.reservaIdModificar && this.nuevaFecha && this.nuevaHora) {
      this.reservaService.actualizarReserva(this.reservaIdModificar, this.nuevaFecha, this.nuevaHora)
        .subscribe(
          () => {
            console.log('Reserva actualizada correctamente.');
            this.cerrarModificarReservaModal();
            this.obtenerReservas(); 
          },
          (error) => {
            console.error('Error al actualizar la reserva:', error);
          }
        );
    } else {
      console.error('Por favor, complete todos los campos.');
    }
  }

  loadFechasDisponibles(): void {

    this.reservaService.getFechasDisponibles(this.salaIdSeleccionada).subscribe(
      fechas => {
        this.fechasDisponibles = fechas.map((fecha: string) => new Date(fecha));
      },
      error => {
        console.error('Error al cargar las fechas disponibles:', error);
      }
    );
  }

  onSelectFecha(event: any): void {
  
    const fecha: NgbDateStruct = event;
    const year = fecha.year;
    const month = fecha.month; 
    const day = fecha.day;
    const fechaString = `${year}-${month}-${day}`;
    this.nuevaFecha = fechaString;
   
    this.reservaService.getHorariosDisponibles(this.salaIdSeleccionada, fechaString).subscribe(
        horarios => {
          this.horariosDisponibles = horarios.filter((horario: string, index: number) => {
            return index % 2 === 0;
          });
          this.nuevaHora = '';
        },
        error => {
          console.error('Error al cargar los horarios disponibles para la fecha:', error);
        }
    );
}
  selectHorario(horario: string) {
  this.nuevaHora = horario;

}

puedeModificarReserva(fechaReserva: string): boolean {
  if (!this.usuario.es_admin) {
      const horaLimite = new Date();
      horaLimite.setDate(horaLimite.getDate() + 2); // Añade 48 horas a la fecha actual
  
      const fechaReservaDate = new Date(fechaReserva);
      return fechaReservaDate.getTime() > horaLimite.getTime();
  }
  return true;
}
}


