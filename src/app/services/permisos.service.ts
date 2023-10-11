import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    this.myApiUrl = 'api/permiso'
   }

   login(permisos: Permisos): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`, permisos)
   }

   getPermiso(permisos: Permisos): Observable<Permisos> {
    return this.http.post<Permisos>(`${this.myAppUrl}${this.myApiUrl}/getPermiso`, permisos)
   }

   getAllPermisos(): Observable<Permisos[]> {
    return this.http.get<Permisos[]>(`${this.myAppUrl}${this.myApiUrl}/getAllPermisos`)
   }
   inactivarPermiso(permisos: Permisos): Observable<Permisos>{
    return this.http.post<Permisos>(`${this.myAppUrl}${this.myApiUrl}/inactivarPermiso`, permisos)
   }
   activarPermiso(permisos: Permisos): Observable<Permisos>{
    return this.http.post<Permisos>(`${this.myAppUrl}${this.myApiUrl}/activarPermiso`, permisos)
   }
}
