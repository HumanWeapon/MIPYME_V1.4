import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviromet';
import { Preguntas } from '../interfaces/preguntas';
import { Observable, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  public preguntas: Preguntas | undefined;
  
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/preguntas'
    // Asignar un valor a una clave en localStorage

   }



   addPregunta(preguntas: Preguntas): Observable<any> {
    const nuevoPregunta = {

      id_pregunta: preguntas.id_pregunta,
      pregunta: preguntas.pregunta,
      creado_por: preguntas.creado_por,
      fecha_creacion: preguntas.fecha_creacion ,
      modificado_por: preguntas.modificado_por,
      fecha_modificacion: preguntas.fecha_modificacion 
      
      };
      return this.http.post<Preguntas>(`${this.myAppUrl}${this.myApiUrl}/postPregunta`, nuevoPregunta)
  }

  

   getPregunta(preguntas: Preguntas): Observable<Preguntas> {
    return this.http.post<Preguntas>(`${this.myAppUrl}${this.myApiUrl}/getPregunta`, preguntas)
   }

   getAllPreguntas(): Observable<Preguntas[]> {
    return this.http.get<Preguntas[]>(`${this.myAppUrl}${this.myApiUrl}/getAllPreguntas`)
   }

   editarPregunta(preguntas: Preguntas): Observable<any> {
    return this.http.post<Preguntas>(`${this.myAppUrl}${this.myApiUrl}/updatePregunta`, preguntas)
  }
}