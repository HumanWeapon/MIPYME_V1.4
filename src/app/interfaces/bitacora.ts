export interface Bitacora {
    id_usuario: number,
    nombre_usuario: string,
    correo_electronico: string,
    estado_usuario: boolean,
    contrasena: string,
    id_rol: number,
    fecha_ultima_conexion: Date,
    preguntas_contestadas: number,
    primer_ingreso: Date,
    fecha_vencimiento: Date,
}