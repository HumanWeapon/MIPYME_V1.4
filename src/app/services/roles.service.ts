import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviromet';
import { Roles } from '../interfaces/roles';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  public roles: Roles | undefined;
  
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/roles'
    // Asignar un valor a una clave en localStorage

   }



   addRol(roles: Roles): Observable<any> {

    const nuevoRol = {
      rol: roles.rol, 
      descripcion: roles.descripcion, 
      estado_rol: roles.estado_rol,
      creado_por: roles.creado_por, 
      fecha_creacion: roles.fecha_creacion, 
      modificado_por: roles.modificado_por, 
      fecha_modificacion: roles.fecha_modificacion
      };
      return this.http.post<Roles>(`${this.myAppUrl}${this.myApiUrl}/postRol`, nuevoRol)
  }

   getRol(roles: Roles): Observable<Roles> {
    return this.http.post<Roles>(`${this.myAppUrl}${this.myApiUrl}/getRol`, roles)
   }

   getAllRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${this.myAppUrl}${this.myApiUrl}/getAllRoles`)
   }
   inactivarRol(roles: Roles): Observable<Roles>{
    return this.http.post<Roles>(`${this.myAppUrl}${this.myApiUrl}/inactivateRol`, roles)
   }
   activarRol(roles: Roles): Observable<Roles>{
    return this.http.post<Roles>(`${this.myAppUrl}${this.myApiUrl}/activateRol`, roles)
   }
  
   editarRol(roles: Roles): Observable<any> {
    return this.http.post<Roles>(`${this.myAppUrl}${this.myApiUrl}/updateRoles`, roles)
  }
}