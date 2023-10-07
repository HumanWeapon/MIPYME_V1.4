import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviromet';
import { Parametros } from '../interfaces/parametros';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  private myAppUrl: string;
  private myApiUrl: string;


  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users'
  }

  getParametros(): Observable<Parametros[]>{
    return this.http.get<Parametros[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }
}
