import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviromet';
import { Preguntas } from '../interfaces/preguntas';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/preguntas'
  }

  getPreguntas(): Observable<Preguntas[]> {
    /*  const token = localStorage.getItem('token')
     const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`) */
    /*     return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`, { headers: headers } ) */
    return this.http.get<Preguntas[]>(`${this.myAppUrl}${this.myApiUrl}/getAllPreguntas` )
  }
}
