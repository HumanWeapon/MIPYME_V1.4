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



   addPregunta(question: Preguntas): Observable<any> {
    const nuevoPregunta = {
      id_pregunta: question.id_pregunta,
      pregunta: question.pregunta,
      creado_por: question.creado_por,
      fecha_creacion: question.fecha_creacion,
      modificado_por: question.modificado_por,
      fecha_modificacion: question.fecha_modificacion,
      
      };
      return this.http.post<Preguntas>(`${this.myAppUrl}${this.myApiUrl}/postPreguntas`, nuevoPregunta)
  }


   getPregunta(preguntas: Preguntas): Observable<Preguntas> {
    return this.http.post<Preguntas>(`${this.myAppUrl}${this.myApiUrl}/getPregunta`, preguntas)
   }

   getAllPreguntas(): Observable<Preguntas[]> {
    return this.http.get<Preguntas[]>(`${this.myAppUrl}${this.myApiUrl}/getAllPreguntas`)
   }
   
   editarPregunta(preguntas: Preguntas): Observable<any> {
    // Construye la URL del servicio que actualiza un usuario por su ID, por ejemplo.
    const url = `${this.myAppUrl}${this.myApiUrl}/updatePregunta/${preguntas.id_pregunta}`;
  
    // Realiza una solicitud HTTP PUT para actualizar el usuario.
    return this.http.put(url, preguntas);
  }
  

}