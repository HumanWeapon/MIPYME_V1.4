//Elaborado Por Breydy Flores
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Categoria } from 'src/app/interfaces/empresas/categoria';
import { ErrorService } from 'src/app/services/error.service';
import { CategoriaService } from 'src/app/services/negocio/categoria.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgZone } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
                       

@Component({
  selector: 'app-categoria',
  templateUrl:'./categoria.component.html',
  styleUrls: ['./categoria.component.css']
})

export class CategoriaComponent implements OnInit{
 

  CategoriaEditando: Categoria = {
    id_categoria: 0,
    categoria: "",
    producto: "",
    descripcion: "",
    creado_por: 'SYSTEM',
    fecha_creacion: new Date(), 
    modificado_por: 'SYSTEM',
    fecha_modificado:new Date(), 
    estado: 0,

  };

  nuevaCategoriaProducto: Categoria = {
    id_categoria: 0,
    categoria: "",
    producto: "",
    descripcion: "",
    creado_por: 'SYSTEM',
    fecha_creacion: new Date(), 
    modificado_por: 'SYSTEM',
    fecha_modificado:new Date(), 
    estado: 0,

  };
  indice: any;

  dtOptions: DataTables.Settings = {};
  listCate: Categoria[] = [];
  data: any;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  modalEditar: NgbModalRef | undefined;


  constructor(
    private _categoriaService: CategoriaService,    
    private toastr: ToastrService,
    private router: Router, 
    private _errorService: ErrorService,
    private modalService: NgbModal,
    private ngZone: NgZone
    ) { }

  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 7,
      language: {url:'//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'},
      responsive: true
    };
    this._categoriaService.getAllCategorias()
      .subscribe((res: any) => {
        this.listCate = res;
        this.dtTrigger.next(null);
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

onInputChange(event: any, field: string) {
    if (field === 'categoria' || field === 'producto'|| field === 'descripcion') {
      const inputValue = event.target.value;
      const uppercaseValue = inputValue.toUpperCase();
      event.target.value = uppercaseValue;
      }
    }


  inactivarCategoria(categoria: Categoria, i: any){
    this._categoriaService.inactivarCategoria(categoria).subscribe(data => this.toastr.success('La categoria: '+ categoria.id_categoria + ' ha sido inactivada'));
    this.listCate[i].estado = 2; 
  }
  activarCategoria(categoria: Categoria, i: any){
    this._categoriaService.activarCategoria(categoria).subscribe(data => this.toastr.success('La categoria: '+ categoria.id_categoria + ' ha sido activada'));
    this.listCate[i].estado = 1;
  }

  agregarNuevaCategoriaProducto() {
    const userlocal=localStorage.getItem('usuario')
    if (userlocal){
      this.nuevaCategoriaProducto = {
        id_categoria: 0,
        categoria: this.nuevaCategoriaProducto.categoria,
        producto:this.nuevaCategoriaProducto.producto,
        descripcion:this.nuevaCategoriaProducto.descripcion,
        creado_por: userlocal , 
        fecha_creacion: new Date(), 
        modificado_por: 'SYSTEM', 
        fecha_modificado: new Date(),
        estado: 0,
  
      };
    }
   
  
    this._categoriaService.addCategoriaProducto(this.nuevaCategoriaProducto).subscribe(data => {
      this.toastr.success('Categoria agregada con éxito');
      
       // Recargar la página
       location.reload();
       // Actualizar la vista
       this.ngZone.run(() => {        
       });
    });
  }


  obtenerIdCategoriaProducto(Cate: Categoria, i: any){
    this.CategoriaEditando = {
      id_categoria: Cate.id_categoria,
      categoria: Cate.categoria,
      producto: Cate.producto,
      descripcion: Cate.descripcion,
      creado_por: Cate.creado_por,
      fecha_creacion: Cate.fecha_creacion, 
      modificado_por: Cate.modificado_por,
      fecha_modificado: Cate.fecha_modificado, 
      estado: Cate.estado,

    };
    this.indice = i;
  }


  editarCategoriaProducto(){
    this._categoriaService.editarCategoriaProducto(this.CategoriaEditando).subscribe(data => {
      this.toastr.success('Categoria editada con éxito');
      this.listCate[this.indice].categoria = this.CategoriaEditando.categoria;
      this.listCate[this.indice].producto = this.CategoriaEditando.producto;
      this.listCate[this.indice].descripcion = this.CategoriaEditando.descripcion;
        // Recargar la página
        location.reload();
        // Actualizar la vista
        this.ngZone.run(() => {        
        });
    
    });
  }
}