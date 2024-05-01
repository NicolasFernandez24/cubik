export interface Reserva{
    id?:number;
    id_usuario:number;
    id_sala:number;
    fecha:string;
    hora:string;
    duracion:number;
    alquila_equipo:boolean;
    id_promocion?:number
    pagada:boolean;
}