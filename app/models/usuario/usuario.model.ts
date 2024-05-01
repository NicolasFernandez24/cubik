
export interface Usuario {
  id?: number;
  nombre?: string;
  telefono?: string;
  correo?: string;
  apellido?: string;
  password?: string;
  es_admin?: boolean;
  [key: string]: string | number | boolean | undefined;
}
