export interface Requisito {
    id_requisito: number,
    id_tipo_requisito: number,
    descripcion: string,
    creado_por: string,
    fecha_creacion: Date,
    modificado_por: string,
    fecha_modificado: Date,
    estado: number,
}