

import { Component, ElementRef, OnInit, Renderer2, ViewChild  } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { NotificacionService } from '../../services/notificaciones.service';
import { Notificacion } from '../../models/notificacion/notificacion.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent   {
  numNotificacionesSinLeer: number = 0;
  notificaciones: Notificacion[] = [];
  mostrandoNotificaciones: boolean = false;
  userId:number=0
  @ViewChild('contactoSection') contactoSection: ElementRef | undefined;
  constructor(private authService: AuthenticationService,private renderer: Renderer2,private notificacionService: NotificacionService) {}

  ngOnInit() {
   
    if (typeof window !== 'undefined') {
      const userIdlo = localStorage.getItem('userId');
      if(userIdlo)
      this.userId=JSON.parse(userIdlo)
      this.handleSmoothScrollOnLoad();

 
      this.handleSmoothScrollOnClick();

      this.actualizarNumNotificacionesSinLeer();
      
     
    
    
    }
    
  }

  actualizarNumNotificacionesSinLeer(): void {
    console.log(this.userId)
    if(this.userId){
     
    this.notificacionService.getNotificacionesPorUsuario(this.userId).subscribe(
      
      (notificaciones: Notificacion[]) => {
        this.notificaciones = notificaciones
        console.log(notificaciones)
        this.numNotificacionesSinLeer = notificaciones.filter(notif => !notif.estado).length;
        console.log(this.numNotificacionesSinLeer)
      },
      (error) => {
        console.error('Error al obtener las notificaciones:', error);
      }
    );
     }
  }

  toggleMostrarNotificaciones(): void {
    this.mostrandoNotificaciones = !this.mostrandoNotificaciones;
    if (this.mostrandoNotificaciones) {
     
      this.notificaciones.forEach(notif => {
        if (!notif.estado) {
          this.marcarNotificacionLeida(notif.id);
        }
      });
    }
  }

  marcarNotificacionLeida(idNotificacion: number): void {
    this.notificacionService.marcarNotificacionLeida(idNotificacion).subscribe(
      () => {
       
        this.numNotificacionesSinLeer = this.notificaciones.filter(notif => !notif.estado).length;

      },
      (error) => {
        console.error('Error al marcar la notificación como leída:', error);
      }
    );
  }
  
  scrollToContact() {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private handleSmoothScrollOnLoad() {
    
    if (window.location.hash) {
     
      this.handleSmoothScrollToTarget(window.location.hash.substring(1));
    }
  }
  isAdmin(): boolean {
    
    return this.authService.isAdmin()
  }
  private handleSmoothScrollOnClick() {
   
    const scrollElements = document.querySelectorAll('.scrollTo');

    
    scrollElements.forEach(element => {
      element.addEventListener('click', event => {
        
        event.preventDefault();

        const targetId = (event.target as HTMLAnchorElement).getAttribute('href');

        this.handleSmoothScrollToTarget(targetId);
      });
    });
  }

  private handleSmoothScrollToTarget(targetId: string | null) {
   
    if (targetId) {
   
      const targetElement = document.getElementById(targetId);

    
      if (targetElement) {
     
        const targetPosition = targetElement.offsetTop;

       
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
 


  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }
}
