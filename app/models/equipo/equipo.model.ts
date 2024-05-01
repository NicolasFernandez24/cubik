export interface Equipo{
    id?:number;
    nombre:string;
    precio:number;
    habilitada:boolean;
    imagen?:string | ArrayBuffer;
}