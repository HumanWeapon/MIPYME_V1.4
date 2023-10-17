export interface Permisos {
    id_permisos: number,
    id_rol: number,
    id_objeto: number,
    rol: string,
    permiso_insercion: boolean,
    permiso_eliminacion: boolean,
    permiso_actualizacion: boolean,
    permiso_consultar: boolean,
    creado_por: string,
    fecha_creacion: Date ,
    modificado_por: string ,
    fecha_modificacion: Date 
}