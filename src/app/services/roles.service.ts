import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviromet';
import { Roles } from '../interfaces/roles';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/rol'
   }

   login(roles: Roles): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`, roles)
   }

   getRol(roles: Roles): Observable<Roles> {
    return this.http.post<Roles>(`${this.myAppUrl}${this.myApiUrl}/getRol`, roles)
   }

   getAllRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${this.myAppUrl}${this.myApiUrl}/getAllRoles`)
   }
   inactivarRol(roles: Roles): Observable<Roles>{
    return this.http.post<Roles>(`${this.myAppUrl}${this.myApiUrl}/inactivarRol`, roles)
   }
   activarRol(roles: Roles): Observable<Roles>{
    return this.http.post<Roles>(`${this.myAppUrl}${this.myApiUrl}/activarRol`, roles)
   }
}