import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/enviroments/enviromet';
import { ContactoTelefono } from '../../interfaces/empresas/contactoTelefono';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoTService {

  public contactoTelefono: ContactoTelefono | undefined;
  
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/contactoTelefono'
    // Asignar un valor a una clave en localStorage

   }



   addContactoT(contactoT: ContactoTelefono): Observable<any> {
    const nuevoContactoT = {
        id_telefono: contactoT.id_telefono, 
        id_contacto: contactoT.id_contacto,
        id_tipo_telefono: contactoT. id_tipo_telefono,
        telefono: contactoT.telefono, 
        extencion: contactoT.extencion,
        descripcion: contactoT.descripcion,
        creado_por: contactoT.creado_por, 
        fecha_creacion: contactoT.fecha_creacion, 
        modificado_por: contactoT.modificado_por, 
        fecha_modificacion: contactoT.fecha_modificacion,
        estado: contactoT.estado,
      };
      return this.http.post<ContactoTelefono>(`${this.myAppUrl}${this.myApiUrl}/postContactoTelefono`, nuevoContactoT)
  }

  
   getContactoTelefono(contactoTelefono: ContactoTelefono): Observable<ContactoTelefono> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<ContactoTelefono>(`${this.myAppUrl}${this.myApiUrl}/getContactoTelefono`, contactoTelefono, { headers: headers })
   }

   getAllContactosTelefono(): Observable<ContactoTelefono[]> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.get<ContactoTelefono[]>(`${this.myAppUrl}${this.myApiUrl}/getAllContactosTelefono`, { headers: headers })
   }
   inactivarContactoTelefono(contactoTelefono: ContactoTelefono): Observable<ContactoTelefono>{
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<ContactoTelefono>(`${this.myAppUrl}${this.myApiUrl}/inactivateContactoTelefono`, contactoTelefono, { headers: headers })
   }
   activarContactoTelefono(contactoTelefono: ContactoTelefono): Observable<ContactoTelefono>{
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<ContactoTelefono>(`${this.myAppUrl}${this.myApiUrl}/activateContactoTelefono`, contactoTelefono, { headers: headers })
   }

   editarContactoTelefono(contactoTelefono: ContactoTelefono): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<ContactoTelefono>(`${this.myAppUrl}${this.myApiUrl}/updateContactoTelefono`, contactoTelefono, { headers: headers })
  }
}



















/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */