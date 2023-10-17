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
    // Asignar un valor a una clave en localStorage

   }



   addUsuario(user: Usuario): Observable<any> {
    const nuevoUsuario = {
      creado_por: "SYSTEM",
      fecha_creacion: user.fecha_creacion,
      modificado_por: "SYSTEM",
      fecha_modificacion: "",
      usuario: user.usuario,
      nombre_usuario: user.nombre_usuario,
      correo_electronico: user.correo_electronico,
      estado_usuario: user.estado_usuario,
      contrasena: user.contrasena,
      id_rol: user.id_rol,
      fecha_ultima_conexion: "",
      fecha_vencimiento: user.fecha_vencimiento,
      intentos_fallidos: user.intentos_fallidos
      };
      return this.http.post<Usuario>(`${this.myAppUrl}${this.myApiUrl}/postUsuario`, nuevoUsuario)
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
  cambiarContrasena(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.myAppUrl}${this.myApiUrl}/cambiarContrasena`, usuario)
  }
  editarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<Usuario>(`${this.myAppUrl}${this.myApiUrl}/updateUsuario`, usuario)
  }
}