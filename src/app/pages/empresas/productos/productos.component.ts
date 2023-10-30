import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Productos } from 'src/app/interfaces/empresas/producto';
import { ErrorService } from 'src/app/services/error.service';
import { ProductosService } from 'src/app/services/producto.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgZone } from '@angular/core';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html', 
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit{

  productoEditando: Productos = {
    id_producto: 0, 
    id_categoria: 0, 
    producto:'', 
    descripcion: '', 
    creado_por: '', 
    fecha_creacion: new Date(), 
    modificado_por: '', 
    fecha_modificacion: new Date(), 
    estado: 0

  };

  nuevoProducto: Productos = {
    id_producto: 0, 
    id_categoria: 0, 
    producto:'', 
    descripcion: '', 
    creado_por: '', 
    fecha_creacion: new Date(), 
    modificado_por: '', 
    fecha_modificacion: new Date(), 
    estado: 0

  };
  indice: any;

  dtOptions: DataTables.Settings = {};
  listProductos: Productos[] = [];
  data: any;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  modalEditar: NgbModalRef | undefined;

  

  constructor(
    private _objService: ProductosService,
    private toastr: ToastrService,
    private router: Router, 
    private _errorService: ErrorService,
    private modalService: NgbModal,
    private ngZone: NgZone
    ) { }

  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
      language: {url:'//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'},
      responsive: true
    };
    this._objService.getAllProductos()
      .subscribe((res: any) => {
        this.listProductos= res;
        console.log(res)
        this.dtTrigger.next(null);
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  onInputChange(event: any, field: string) {
    const inputValue = event.target.value;
    if (field === 'productos') {
      // Convierte a mayúsculas y elimina espacios en blanco
      event.target.value = inputValue.toUpperCase().replace(/\s/g, '')
    } else if (field === 'tipo_producto' || field === 'descripcion'){
      // Convierte a mayúsculas sin eliminar espacios en blanco
      event.target.value = inputValue.toUpperCase();
    }
  }
  
 
  
  inactivarProducto(productos: Productos, i: any){
    this._objService.inactivarProductos(productos).subscribe(data => this.toastr.success('El producto: '+ productos.producto+ ' ha sido inactivado'));
    this.listProductos[i].estado = 2;
  }
  activarProductos(productos: Productos, i: any){
    this._objService.activarProductos(productos).subscribe(data => this.toastr.success('El producto: '+ productos.producto+ ' ha sido activado'));
    this.listProductos[i].estado = 1;
  }

  agregarNuevoProducto() {

    this.nuevoProducto = {
      id_producto: 0, 
      id_categoria: 0, 
      producto: this.nuevoProducto.producto, 
      descripcion:this.nuevoProducto.descripcion, 
      estado: 0,
      creado_por: 'SYSTEM', 
      fecha_creacion: new Date(), 
      modificado_por: 'SYSTEM', 
      fecha_modificacion: new Date()

    };

    this._objService.addProducto(this.nuevoProducto).subscribe(data => {
      this.toastr.success('Producto agregado con éxito');
      
       // Recargar la página
       location.reload();
       // Actualizar la vista
       this.ngZone.run(() => {        
       });
    });
  }


  obtenerIdProductos(productos: Productos, i: any){
    this.productoEditando = {
    id_producto: productos.id_producto,
    id_categoria: productos.id_categoria, 
    producto: productos.producto, 
    descripcion: productos.descripcion,  
    creado_por: productos.creado_por, 
    fecha_creacion: productos.fecha_creacion, 
    modificado_por: productos.modificado_por, 
    fecha_modificacion: productos.fecha_modificacion,
    estado: productos.estado

    };
    this.indice = i;
  
  }


  editarProducto(){
    this._objService.editarProducto(this.productoEditando).subscribe(data => {
      this.toastr.success('Producto editado con éxito');
      this.listProductos[this.indice].producto = this.productoEditando.producto;
      this.listProductos[this.indice].descripcion = this.productoEditando.descripcion;
      this.listProductos[this.indice].estado = this.productoEditando.estado;
        // Recargar la página
        location.reload();
        // Actualizar la vista
        this.ngZone.run(() => {        
        });
    
    });
  }
}
