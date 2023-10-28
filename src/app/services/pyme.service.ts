import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/enviroments/enviromet';
import { Observable, catchError } from 'rxjs';
import { Pyme } from '../interfaces/empresas/pyme';

@Injectable({
  providedIn: 'root'
})
export class PymeService {

  public pyme: Pyme | undefined;
  
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/pyme'
    // Asignar un valor a una clave en localStorage
   }

   getPyme(pyme: Pyme): Observable<Pyme> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<Pyme>(`${this.myAppUrl}${this.myApiUrl}/getPyme`, pyme)
  }

  getAllPymes(): Observable<Pyme[]> {
    return this.http.get<Pyme[]>(`${this.myAppUrl}${this.myApiUrl}/getAllPymes`)
  }

  







}