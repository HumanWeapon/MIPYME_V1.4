import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pyme } from 'src/app/interfaces/empresas/pyme';
import { environment } from 'src/enviroments/enviromet';

@Injectable({
  providedIn: 'root'
})
export class PymesService {

  public pyme: Pyme | undefined;
  
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/pyme'
    // Asignar un valor a una clave en localStorage
   }


   postPyme(pyme: Pyme): Observable<any> {
    const nuevaPyme = {
                nombre_pyme: pyme.nombre_pyme,
                categoria: pyme.categoria,
                descripcion: pyme.descripcion, 
                creado_por: pyme.creado_por,
                estado: pyme.estado
      };
      return this.http.post<Pyme>(`${this.myAppUrl}${this.myApiUrl}/postPyme`, nuevaPyme)
  }


   getPyme(pyme: Pyme): Observable<Pyme> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<Pyme>(`${this.myAppUrl}${this.myApiUrl}/getPyme`, pyme)
  }

  getAllPymes(): Observable<Pyme[]> {
    return this.http.get<Pyme[]>(`${this.myAppUrl}${this.myApiUrl}/getAllPymes`)
  }

  inactivarPyme(pyme: Pyme): Observable<Pyme>{
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<Pyme>(`${this.myAppUrl}${this.myApiUrl}/inactivatePyme`, pyme, { headers: headers })
  }

  activarPyme(pyme: Pyme): Observable<Pyme>{
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<Pyme>(`${this.myAppUrl}${this.myApiUrl}/activatePyme`, pyme, { headers: headers })
  }

  cambiarContrasena(pyme: Pyme): Observable<Pyme>{
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.put<Pyme>(`${this.myAppUrl}${this.myApiUrl}/cambiarContrasena`, pyme, { headers: headers })
  }

  editarPyme(pyme: Pyme): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<Pyme>(`${this.myAppUrl}${this.myApiUrl}/updatePyme`, pyme, { headers: headers })
  }


}
