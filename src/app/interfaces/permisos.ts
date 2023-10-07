export interface Permisos {
    id_Permisos: number,
    id_Rol: number,
    id_Objeto: number,
    permiso_insercion: boolean,
    permiso_eliminacion: boolean,
    permiso_actualizacion: boolean,
    permiso_consultar: boolean,
    creado_por: string,
    fecha_creacion: Date ,
    modificado_por: string ,
    fecha_modificacion: Date 
}