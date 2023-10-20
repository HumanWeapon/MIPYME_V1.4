import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/enviroments/enviromet';
import { Permisos } from '../interfaces/permisos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/permisos'
   }


   getPermiso(permisos: Permisos): Observable<Permisos> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<Permisos>(`${this.myAppUrl}${this.myApiUrl}/getPermiso`, permisos, { headers: headers })
   }

   getAllPermisos(): Observable<Permisos[]> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.get<Permisos[]>(`${this.myAppUrl}${this.myApiUrl}/getAllPermisos`, { headers: headers })
   }
   inactivarPermiso(permisos: Permisos): Observable<Permisos>{
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<Permisos>(`${this.myAppUrl}${this.myApiUrl}/inactivarPermiso`, permisos, { headers: headers })
   }
   activarPermiso(permisos: Permisos): Observable<Permisos>{
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<Permisos>(`${this.myAppUrl}${this.myApiUrl}/activarPermiso`, permisos, { headers: headers })
   }
}
