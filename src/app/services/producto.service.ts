import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/enviroments/enviromet';
import { Observable, catchError } from 'rxjs';
import { Productos } from '../interfaces/empresas/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  public productos: Productos | undefined;
  
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/productos'
    // Asignar un valor a una clave en localStorage

   }



   addProducto(pro: Productos): Observable<any> {
    const nuevoProducto = {
      producto: pro.producto, 
      descripcion: pro.descripcion, 
      creado_por: pro.creado_por, 
      fecha_creacion: pro.fecha_creacion, 
      modificado_por: pro.modificado_por, 
      fecha_modificacion: pro.fecha_modificacion,
      estado_: pro.estado

      };
      return this.http.post<Productos>(`${this.myAppUrl}${this.myApiUrl}/postProducto`, nuevoProducto)
  }

  
   getProducto(productos: Productos): Observable<Productos> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<Productos>(`${this.myAppUrl}${this.myApiUrl}/getProducto`, productos, { headers: headers })
   }

   getAllProductos(): Observable<Productos[]> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.get<Productos[]>(`${this.myAppUrl}${this.myApiUrl}/getAllProductos`, { headers: headers })
   }
   inactivarProductos(productos: Productos): Observable<Productos>{
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<Productos>(`${this.myAppUrl}${this.myApiUrl}/inactivateProducto`, productos, { headers: headers })
   }
   activarProductos(productos: Productos): Observable<Productos>{
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<Productos>(`${this.myAppUrl}${this.myApiUrl}/activateProducto`, productos, { headers: headers })
   }

   editarProducto(productos: Productos): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<Productos>(`${this.myAppUrl}${this.myApiUrl}/updateProducto`, productos, { headers: headers })
  }
}