import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviromet';
import { Objetos } from '../interfaces/objetos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjetService {
  
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/objet'
   }

   login(objetos: Objetos): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`, objetos)
   }

   getObjeto(objetos: Objetos): Observable<Objetos> {
    return this.http.post<Objetos>(`${this.myAppUrl}${this.myApiUrl}/getObjeto`, objetos)
   }

   getAllObjetos(): Observable<Objetos[]> {
    return this.http.get<Objetos[]>(`${this.myAppUrl}${this.myApiUrl}/getAllObjetos`)
   }
   inactivarObjeto(objetos: Objetos): Observable<Objetos>{
    return this.http.post<Objetos>(`${this.myAppUrl}${this.myApiUrl}/inactivarteObjeto`, objetos)
   }
   activarObjeto(objetos: Objetos): Observable<Objetos>{
    return this.http.post<Objetos>(`${this.myAppUrl}${this.myApiUrl}/activatarObjeto`, objetos)
   }
}