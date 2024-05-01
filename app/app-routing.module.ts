import { Routes } from '@angular/router';
import { RegistroComponent } from './componets/registro/registro.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { HomeComponent } from './componets/home/home.component';
import { NavbarComponent } from './componets/navbar/navbar.component';

import { SalasComponent } from './componets/salas/salas.component';
import { DetalleSalasComponent } from './componets/detalle-salas/detalle-salas.component';
import { CrearModificarSalaComponent } from './crear-modificar-sala/crear-modificar-sala.component';
import { UsuarioComponent } from './componets/usuario/usuario.component';
import { ModificarSalaComponent } from './modificar-sala/modificar-sala.component';
import { ListaEquiposComponent } from './componets/listar-equipos/listar-equipos.component';
import { AgregarEquipoComponent } from './componets/agregar-equipos/agregar-equipos.component';
import { ModificarEquipoComponent } from './componets/modificar-equipos/modificar-equipos.component';
import { PromocionComponent } from './componets/promocion/promocion.component';

import { PagoExitosoComponent } from './componets/pago-exitoso/pago-exitoso.component';
import { ReservaDialogComponent } from './componets/reserva-dialog/reserva-dialog.component';
export const routes: Routes = [
    {path: 'registro', component: RegistroComponent },
    {path: 'login', component:LoginComponent },
    { path: 'home', component: HomeComponent },
    {path:'navbar',component:NavbarComponent},
    
    { path: 'salas', component: SalasComponent },
    { path: 'sala/:id', component:DetalleSalasComponent },
    {path: 'usuario',component:UsuarioComponent},
    {path: 'modifica-sala',component:CrearModificarSalaComponent},
    {path:'modificar-sala/:id',component:ModificarSalaComponent},
    {path:'equipos',component:ListaEquiposComponent},
    {path:'agregar-equipo',component:AgregarEquipoComponent},
    {path:'modificar-equipo/:id',component:ModificarEquipoComponent},
    {path:'promocion',component:PromocionComponent},
   {path:'reservas',component:ReservaDialogComponent},
    {path:'pago_exitoso',component:PagoExitosoComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}