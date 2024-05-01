
  import { HttpClientModule } from '@angular/common/http'
  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { FormsModule } from '@angular/forms';
  import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { RegistroComponent } from './componets/registro/registro.component';
  import { LoginComponent } from './componets/login/login.component';
  import { HomeComponent } from './componets/home/home.component';
  import { NavbarComponent } from './componets/navbar/navbar.component';
  
  import { SalasComponent } from './componets/salas/salas.component';
  import { DetalleSalasComponent } from './componets/detalle-salas/detalle-salas.component';
  import { UsuarioComponent } from './componets/usuario/usuario.component';
  import { CrearModificarSalaComponent } from './crear-modificar-sala/crear-modificar-sala.component';
  import { ModificarSalaComponent } from './modificar-sala/modificar-sala.component';
  import { ListaEquiposComponent } from './componets/listar-equipos/listar-equipos.component';
  import { AgregarEquipoComponent } from './componets/agregar-equipos/agregar-equipos.component';
  import { ModificarEquipoComponent } from './componets/modificar-equipos/modificar-equipos.component';
  import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
  import { MatDatepickerModule } from '@angular/material/datepicker';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';
  import { MatNativeDateModule } from '@angular/material/core';
  import { DatePipe } from '@angular/common';
  import { CommonModule } from '@angular/common';
import { PromocionComponent } from './componets/promocion/promocion.component';
import { ReservaDialogComponent } from './componets/reserva-dialog/reserva-dialog.component';

import { PagoExitosoComponent } from './componets/pago-exitoso/pago-exitoso.component';
import { CalendarioComponent } from './componets/calendario/calendario.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


  @NgModule({
    declarations: [
      AppComponent,
      RegistroComponent,
      LoginComponent,
      HomeComponent,
      NavbarComponent,
 
      SalasComponent,
      DetalleSalasComponent,
      UsuarioComponent,
      CrearModificarSalaComponent,
      ModificarSalaComponent,
      ListaEquiposComponent ,
      AgregarEquipoComponent,
      ModificarEquipoComponent,
      PromocionComponent,
      ReservaDialogComponent,
   
      PagoExitosoComponent,
          CalendarioComponent,
        
   
    
    ],
    imports: [
      
      CommonModule,
      MatDatepickerModule,
      MatFormFieldModule,
      MatInputModule,
      MatNativeDateModule,
      BrowserModule,
      FormsModule,  
      AppRoutingModule,
      HttpClientModule,
      NgbModule
    ],
    providers: [
      DatePipe,
    
      provideAnimationsAsync()
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }

