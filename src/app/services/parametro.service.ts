import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviromet';
import { Parametros } from '../interfaces/parametros';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  public parametros: Parametros | undefined;
  
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/parametros'
    // Asignar un valor a una clave en localStorage

   }



   addParametro(parametro: Parametros): Observable<any> {
    const nuevoParametro = {
      id_parametro: parametro.id_parametro,
      parametro: parametro.parametro,
      valor: parametro.valor,
      id_usuario: parametro.id_usuario,
      creado_por: parametro.creado_por,
      fecha_creacion: parametro.fecha_creacion,
      modificado_por: parametro.modificado_por,
      fecha_modificacion: parametro.fecha_modificacion,
      alerta_busqueda: parametro.alerta_busqueda
      };
      return this.http.post<Parametros>(`${this.myAppUrl}${this.myApiUrl}/postParametro`, nuevoParametro)
  }


   getParametro(parametros: Parametros): Observable<Parametros> {
    return this.http.post<Parametros>(`${this.myAppUrl}${this.myApiUrl}/getParametro`, parametros)
   }

   getAllParametros(): Observable<Parametros[]> {
    return this.http.get<Parametros[]>(`${this.myAppUrl}${this.myApiUrl}/getAllParametros`)
   }
  
   editarParametro(parametros: Parametros): Observable<any> {
    return this.http.post<Parametros>(`${this.myAppUrl}${this.myApiUrl}/updateParametro`, parametros)
  }
}