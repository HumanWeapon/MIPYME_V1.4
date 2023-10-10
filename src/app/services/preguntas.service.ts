import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, of } from 'rxjs';
import { environment } from 'src/enviroments/enviromet';
import { Preguntas } from '../interfaces/preguntas';
import { Preguntas_Usuario } from '../interfaces/preguntasUsuario';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {
  private myAppUrl: string;
  private myApiUrl: string;
  private myApiUrl2: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/preguntas'
    this.myApiUrl2 = 'api/preguntasusuario'
  }

  getPreguntasPorUsuario(usuario: Preguntas_Usuario): Observable<Preguntas[]> {
    // Llama a tu servicio de la API para obtener las respuestas del usuario por su ID
    return this.http.post<Preguntas_Usuario[]>(`${this.myAppUrl}${this.myApiUrl2}/getPreguntasusuario`, usuario).pipe(
      switchMap((respuestasUsuario) => {
        // Extrae las IDs de pregunta de las respuestas del usuario
        const preguntaIds = respuestasUsuario.map(respuesta => respuesta.id_pregunta);

        if (preguntaIds.length === 0) {
          // Si no hay IDs de pregunta, devuelve un arreglo vacío
          return of([]);
        }
        
        // Llama a la API de preguntas para obtener las preguntas relacionadas
        return this.http.get<Preguntas[]>(`${this.myAppUrl}${this.myApiUrl}/preguntasPorIds/${preguntaIds.join(',')}`);
      })
    );
  }
}