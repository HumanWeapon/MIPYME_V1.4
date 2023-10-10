import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviromet';
import { Preguntas_Usuario } from '../interfaces/preguntasUsuario';

@Injectable({
  providedIn: 'root'
})
export class PreguntasUsuarioService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/preguntasusuario'
  }

  getPreguntasUsuario(id_usuario: Preguntas_Usuario): Observable<Preguntas_Usuario[]> {
    return this.http.post<Preguntas_Usuario[]>(`${this.myAppUrl}${this.myApiUrl}/getPreguntasusuario`, id_usuario)
  }
  validarRespuesta(Pregunta: Preguntas_Usuario): Observable<Preguntas_Usuario[]>{
    return this.http.post<Preguntas_Usuario[]>(`${this.myAppUrl}${this.myApiUrl}/validarRespuestas`, Pregunta)
  }
  validatePreguntas(): Observable<Preguntas_Usuario[]>{
    return this.http.get<Preguntas_Usuario[]>(`${this.myAppUrl}${this.myApiUrl}/preguntasUsuarioPreguntas`)
  }
}
