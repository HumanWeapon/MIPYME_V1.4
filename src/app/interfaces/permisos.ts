export interface Permisos {
    id_permisos: number,
    id_rol: number,
    id_objeto: number,
<<<<<<< HEAD
    permiso_insercion: false,
    permiso_eliminacion: false,
    permiso_actualizacion: false,
    permiso_consultar: false,
=======
    rol: string,
    permiso_insercion: boolean,
    permiso_eliminacion: boolean,
    permiso_actualizacion: boolean,
    permiso_consultar: boolean,
>>>>>>> df04b965cc7d8ed1ca4d12355980e443634dc9c3
    creado_por: string,
    fecha_creacion: Date ,
    modificado_por: string ,
    fecha_modificacion: Date 
}