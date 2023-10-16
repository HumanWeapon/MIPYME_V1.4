import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviromet';
import { Objetos } from '../interfaces/objetos';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjetosService {

  public objetos: Objetos | undefined;
  
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/objetos'
    // Asignar un valor a una clave en localStorage

   }



   addObjeto(obj: Objetos): Observable<any> {
    const nuevoObjeto = {
      objeto: obj.objeto, 
      descripcion: obj.descripcion, 
      tipo_objeto: obj.tipo_objeto, 
      estado_objeto: obj.estado_objeto,
      creado_por: obj.creado_por, 
      fecha_creacion: obj.fecha_creacion, 
      modificado_por: obj.modificado_por, 
      fecha_modificacion: obj.fecha_modificacion
      };
      return this.http.post<Objetos>(`${this.myAppUrl}${this.myApiUrl}/postObjeto`, nuevoObjeto)
  }

  
   getObjeto(objetos: Objetos): Observable<Objetos> {
    return this.http.post<Objetos>(`${this.myAppUrl}${this.myApiUrl}/getObjeto`, objetos)
   }

   getAllObjetos(): Observable<Objetos[]> {
    return this.http.get<Objetos[]>(`${this.myAppUrl}${this.myApiUrl}/getAllObjetos`)
   }
   inactivarObjeto(objetos: Objetos): Observable<Objetos>{
    return this.http.post<Objetos>(`${this.myAppUrl}${this.myApiUrl}/inactivateObjetos`, objetos)
   }
   activarObjeto(objetos: Objetos): Observable<Objetos>{
    return this.http.post<Objetos>(`${this.myAppUrl}${this.myApiUrl}/activateObjeto`, objetos)
   }

   editarObjeto(objetos: Objetos): Observable<any> {
    return this.http.post<Objetos>(`${this.myAppUrl}${this.myApiUrl}/updateObjetos`, objetos)
  }
}