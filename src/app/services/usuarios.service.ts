import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviromet';
import { Usuario } from '../interfaces/usuario';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public usuario: Usuario | undefined;

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users'
   }

   addUsuario(user: Usuario): Observable<any> {
    const nuevoUsuario = {
      id_usuario: user.id_usuario,
      usuario: user.usuario,
      contrasena: 'xxx1',
      nombre_usuario: user.nombre_usuario,
      correo_electronico: user.correo_electronico,
      intentos_fallidos: 0
      };

    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/postUsuario`, nuevoUsuario)
  }
  
   login(usuario: Usuario): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`, usuario)
   }

   getUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.myAppUrl}${this.myApiUrl}/getUsuario`, usuario)
   }

   getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.myAppUrl}${this.myApiUrl}/getAllUsuarios`)
   }
   inactivarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${this.myAppUrl}${this.myApiUrl}/inactivateUsuario`, usuario)
   }
   activarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${this.myAppUrl}${this.myApiUrl}/activateUsuario`, usuario)
   }
}
