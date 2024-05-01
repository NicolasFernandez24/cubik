import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceSalaService } from '../../services/api-service-sala.service';
import { BackgroundImageService } from '../../services/background-image.service';
import { Sala } from '../../models/sala/sala.model';
import { ReservaService } from '../../services/api-service-rerserva.service';
import { EquipoService } from '../../services/api-service-equipo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { Equipo } from '../../models/equipo/equipo.model';
import { Reserva } from '../../models/reserva/reserva.model';
import { AuthenticationService } from '../../services/authentication.service';
import { EquipoxReservaService } from '../../services/api-service-equipox-reserva.service';
import { PromocionService } from '../../services/api-service-promocion.service';
import { Router } from '@angular/router';
import { MercadoPagoService } from '../../services/mercado-pago.service';
import { ApiServiceUsuariosService } from '../../services/api-service-usuarios.service';
import { Usuario } from '../../models/usuario/usuario.model';
@Component({
  selector: 'app-detalle-salas',
  templateUrl: './detalle-salas.component.html',
  styleUrls: ['./detalle-salas.component.css']
})
export class DetalleSalasComponent implements OnInit {
  salaId: number = 0;
  sala: Sala = {
    nombre: '',
    cantidad: 0,
    precio: 0,
    habilitada: true
  };
  usuario:Usuario={ }
  reserva:Reserva={
    id_usuario:0,
    id_sala:0,
    fecha:'',
    hora:'',
    duracion:2,
    alquila_equipo:false,
    pagada:false,
  }
  backgroundImage: string = '';
  imgSala: string[] = ['valor1', 'valor2', 'valor3'];
  fechasDisponibles: Date[] = [];
  horariosDisponibles: string[] = [];
  fechaSeleccionada: string | null = null;
  horarioSeleccionado: string | null = null;
  minDate: Date = new Date(); 
  duracionSeleccionada: number = 2; 
  alquilarEquipo: boolean = false; 
  equiposDisponibles: Equipo[]  = []; 
  equipoSeleccionado: Set<number> = new Set<number>();
  precioSala: number = 0; 
  precioEquipos: number = 0; 
  horaSeleccionada: boolean = false;
  equipmentImageShown: boolean = false;
  promociones: any[] = [];
  nombre: string = '';
  descripcion: string = '';
  tipoDescuento: string = '';
  duracionAdicional: number = 0;
  descuento: number = 0;
  isEditing: boolean = false;
  promocionId?: number;
  habilitada:boolean=false;
  promocionesDisponibles: any[] = [];
  pagada:boolean=false;
  montoAPagar: number = 0; 
  userid:number | null=0;
  mostrarMensajeError: boolean = false;
  @ViewChild('reservaModal') reservaModal!: TemplateRef<any>;
  constructor(
    private route: ActivatedRoute,
    private salaService: ApiServiceSalaService,
    private backgroundImageService: BackgroundImageService,
    private reservaService: ReservaService,
    private equipoService: EquipoService, 
    private modalService: NgbModal,
    private AuthService:AuthenticationService,
    private equipoxReservaService: EquipoxReservaService,
    private PromocionService: PromocionService,
    private mercadoPagoService:MercadoPagoService,
    private UsuarioService:ApiServiceUsuariosService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id !== null) {
        this.salaId = +id;
        this.loadSala();
        this.backgroundImage = this.backgroundImageService.getBackgroundImage(this.salaId);
        this.imgSala = this.backgroundImageService.getSalaImages(this.salaId);
        this.loadFechasDisponibles();
        this.cargarEquiposDisponibles();
        const userIdlo = localStorage.getItem('userId');
        if(userIdlo)
        this.userid=JSON.parse(userIdlo)
          if(this.userid)
          this.CargarUsuario(this.userid)
      }
    });
  }
  cargarPromociones(): void {
    this.PromocionService.getAllPromciones().subscribe(
      (response: any) => {
        this.promocionesDisponibles = response;
      },
      error => {
        console.error('Error al cargar las promociones:', error);
      }
    );
  }
  showEquipmentImage(): void {
    this.equipmentImageShown = true; 
  
  }
  
  getEquipmentImages() {
    const images: string[] = [];
    const equiposSeleccionadosArray = Array.from(this.equipoSeleccionado);
    
    if (this.equipmentImageShown && this.equipoSeleccionado) {
      const equiposSeleccionados = (equiposSeleccionadosArray ?? []).map(id => this.equiposDisponibles.find(e => e.id === id)).filter(equipo => equipo !== undefined) as Equipo[];
      
      equiposSeleccionados.forEach(equipo => {
        if (equipo && typeof equipo.imagen === 'string') {
          images.push(equipo.imagen);
        }
      });
    }
    
    return images;
  }
  
  
  
  loadSala(): void {
    this.salaService.getSalaById(this.salaId).subscribe(
      sala => {
        this.sala = sala;
        this.precioSala = sala.precio; 
      },
      error => {
        console.error('Error al cargar la sala:', error);
      }
    );
  }
 

  loadFechasDisponibles(): void {
    this.reservaService.getFechasDisponibles(this.salaId).subscribe(
      fechas => {
        if (fechas.length === 0) {
          console.log('No hay fechas disponibles.');
        } else {
          this.fechasDisponibles = fechas.map((fecha: string) => new Date(fecha));
        }
      },
      error => {
        console.error('Error al cargar las fechas disponibles:', error);
      }
    );
  }


  onSelectFecha(fecha: Date | null): void {
    if (fecha) {
      const fechaString = fecha.toISOString().slice(0, 10);
      this.fechaSeleccionada = fechaString;
      this.reservaService.getHorariosDisponibles(this.salaId, fechaString).subscribe(
        horarios => {
        
          if (this.salaId === 3) {
            
            this.horariosDisponibles = horarios.filter((horario, index) => index % 2 !== 0);
          } else {
           
            this.horariosDisponibles = horarios.filter((horario, index) => index % 2 === 0);
          }
          this.horarioSeleccionado = null;
        },
        error => {
          console.error('Error al cargar los horarios disponibles para la fecha:', error);
        }
      );
    } else {
      console.error('Fecha seleccionada es nula.');
    }
  }

  
  selectHorario(horario: string): void {
    this.horarioSeleccionado = horario;
    this.horaSeleccionada = true;
  }

  abrirModalReserva(): void {
    const modalRef = this.modalService.open(this.reservaModal, { size: 'lg' });
    modalRef.result.then((result: any) => {
      console.log("cerrando modal");
      this.limpiarModal(); // Limpiar los valores cuando se cierra el modal correctamente
    }, (reason: any) => {
      console.log("modal cancelado");
      this.limpiarModal(); // Limpiar los valores cuando se cancela el modal
    });
  }

 
  calcularPrecioTotal(): number {
    let precioTotal = this.precioSala; 
    const equiposSeleccionadosArray = Array.from(this.equipoSeleccionado);
   
    this.equipoSeleccionado.forEach(id => {
      const equipo = this.equiposDisponibles.find(e => e.id === id);
      if (equipo) {
        precioTotal += equipo.precio;
      }
    });
  
    
    if (Number(this.duracionSeleccionada)  !== 2 ) {

      const aumento = this.precioSala * 0.3;
      precioTotal += aumento;
    } else {
      
      const aumento = this.precioSala * 0.3;
      precioTotal -= aumento;
    }
  
    return precioTotal;
  }
  limpiarModal(): void {
    this.fechaSeleccionada = null;
    this.horarioSeleccionado = null;
    this.duracionSeleccionada = 2;
    this.alquilarEquipo = false;
    this.equipoSeleccionado.clear(); 
    this.equipmentImageShown = false;
  }
  CargarUsuario(userid:number){
    if(userid){
      this.UsuarioService.obtenerUsuarioPorId(userid).subscribe(
        response => {

          this.usuario = response;
        },
        error => {
          console.error('Error al cargar usuario', error);
         
        }
      )
     }
  }
  confirmarReserva(): void {
    const equiposSeleccionadosArray = Array.from(this.equipoSeleccionado);
    const equiposSeleccionados = equiposSeleccionadosArray.map(id => this.equiposDisponibles.find(e => e.id === id)).filter(equipo => equipo !== undefined) as Equipo[];
    const precioEquipos = equiposSeleccionados.reduce((total, equipo) => total + equipo.precio, 0);
    if (this.horarioSeleccionado && this.fechaSeleccionada) {
      this.userid=this.AuthService.getUserId()
     
      if (this.userid != null) {

    this.reserva.id_usuario=this.userid
    if(this.sala.id)
    this.reserva.id_sala=this.sala.id
    this.reserva.fecha=this.fechaSeleccionada
    this.reserva.hora=this.horarioSeleccionado
    this.reserva.alquila_equipo = this.alquilarEquipo;
    localStorage.setItem('reserva', JSON.stringify(this.reserva));
    localStorage.setItem('equiposDisponibles',JSON.stringify(this.equiposDisponibles));
    localStorage.setItem('equipoSelecionados',JSON.stringify(equiposSeleccionados));

        if (!this.montoAPagar || this.montoAPagar <= 0) {
          console.error('Debe ingresar un monto válido.');
          return;
        }
        
        // Verificar que el monto sea superior a la mitad del monto total
        const precioTotal = this.calcularPrecioTotal(); 
        if (this.montoAPagar < precioTotal / 2) {
          console.error('El monto a pagar debe ser superior a la mitad del monto total.');
          this.mostrarMensajeError = true; 
          return;
        } else {
          this.mostrarMensajeError = false; 
        }

        localStorage.setItem('montoTotal',JSON.stringify(precioTotal));
        localStorage.setItem('montoApagar',JSON.stringify(this.montoAPagar));

        const preferenceData = {
         
              title: `Reserva de sala ${this.sala.nombre}`, 
              unit_price: this.montoAPagar.toString(),
              quantity: 1, 
              currency_id: 'ARS',
              payer_email: this.usuario.correo,

        };
        
        
  
        this.mercadoPagoService.realizarPago(preferenceData).subscribe(
          (response) => {
            console.log('Orden de compra generada con éxito:', response);
            const initpoint = response.preference.init_point;
            window.location.href = initpoint;
            
          },
          (error) => {
            console.error('Error al generar la orden de compra:', error);
          }
        );
      } else {
        console.error('El usuario no está autenticado.');
      }
    } else {
      console.error('No se ha seleccionado un horario o una fecha.');
    }
  }
  



  cargarEquiposDisponibles(): void {
   
      this.equipoService.GetAllEquipos().subscribe(
        equipos => {
          this.equiposDisponibles = equipos.filter(equipo => equipo.habilitada); 
         
        },
        error => {
          console.error('Error al cargar los equipos disponibles:', error);
        }
      );

  }
  toggleEquipoSelection(equipoId: number | undefined ): void {
    if(equipoId){
    if (this.equipoSeleccionado.has(equipoId)) {
      this.equipoSeleccionado.delete(equipoId);
    } else {
      this.equipoSeleccionado.add(equipoId);
    }
  }
}
}
