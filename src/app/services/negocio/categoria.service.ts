import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/enviroments/enviromet';
import { Categoria } from '../../interfaces/empresas/categoria';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public categoria: Categoria | undefined;
  
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/categoria'
    // Asignar un valor a una clave en localStorage

   }


   addCategoriaProducto(Cate: Categoria): Observable<any> {
    const nuevaCategoriaProducto = {
     categoria: Cate.categoria,
      descripcion: Cate.descripcion,
      creado_por: Cate.creado_por, 
      fecha_creacion: Cate.fecha_creacion, 
      modificado_por: Cate.modificado_por, 
      fecha_modificado: Cate.fecha_modificado,
      estado: Cate.estado,
      };
      return this.http.post<Categoria>(`${this.myAppUrl}${this.myApiUrl}/postCategoria`, nuevaCategoriaProducto)
  }

  
   getCategoria(categoria: Categoria): Observable<Categoria> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<Categoria>(`${this.myAppUrl}${this.myApiUrl}/getCategoria`, this.categoria, { headers: headers })
   }

   getAllCategorias(): Observable<Categoria[]> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.get<Categoria[]>(`${this.myAppUrl}${this.myApiUrl}/getAllCategorias`, { headers: headers })
   }
   inactivarCategoria(categoria: Categoria): Observable<Categoria>{
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<Categoria>(`${this.myAppUrl}${this.myApiUrl}/inactivateCategoria`, categoria, { headers: headers })
   }
   activarCategoria(categoria: Categoria): Observable<Categoria>{
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<Categoria>(`${this.myAppUrl}${this.myApiUrl}/activateCategoria`, categoria, { headers: headers })
   }

   editarCategoriaProducto(categoria: Categoria): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<Categoria>(`${this.myAppUrl}${this.myApiUrl}/updateCategoria`, categoria, { headers: headers })
  }
}