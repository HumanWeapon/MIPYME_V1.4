import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Pyme  } from 'src/app/interfaces/empresas/pyme';
import { PymesService } from 'src/app/services/negocio/pymes.service';
import { ErrorService } from 'src/app/services/error.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgZone } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { TipoEmpresa } from 'src/app/interfaces/empresas/tipoEmpresa';
import { TipoEmpresaService } from 'src/app/services/negocio/tipoEmpresa.service';



@Component({
  selector: 'app-pymes',
  templateUrl: './pymes.component.html',
  styleUrls: ['./pymes.component.css']
})

export class PymesComponent implements OnInit  {

  pymeEditando: Pyme = {
    id_pyme: 0,
    id_tipo_empresa:0,
    nombre_pyme: '',
    categoria: '',
    descripcion: '',
    creado_por: '',
    fecha_creacion: new Date(),
    modificado_por: '',
    fecha_modificacion: new Date(),
    estado: 0
  };


  nuevaPyme: Pyme = {
    id_pyme: 0,
    id_tipo_empresa:0,
    nombre_pyme: '',
    categoria: '',
    descripcion: '',
    creado_por: '',
    fecha_creacion: new Date(),
    modificado_por: '',
    fecha_modificacion: new Date(),
    estado: 0
  };
  indice: any;

  dtOptions: DataTables.Settings = {};
  listPymes: Pyme[] = [];
  data: any; 

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  modalEditar: NgbModalRef | undefined;

  empresa: TipoEmpresa[]=[];
  pymesAll: any[] = [];

  nuevoRegistro: any = {
    id_tipo_empresa: 0, // Valor inicial, ajusta según tus necesidades
    // Otras propiedades para tu nuevo registro
  };


  constructor(
    private _pymeService: PymesService,
    private toastr: ToastrService,
    private ngZone: NgZone,
    private _tipoEmpresaService: TipoEmpresaService
  ) {}

  ngOnInit(): void {
    this.getAllPyme();
    this.getAllEmpresa();
  }

  getAllEmpresa(){
    this._tipoEmpresaService.getAllTipoEmpresa().subscribe((data) => {
      this.empresa = data;
      console.log(this.empresa)
    });

    this._pymeService.pymesAllTipoEmpresa().subscribe({
      next: (data) =>{
        this.pymesAll = data;
      }
    });
  }


  getTipoEmpresaNombre(idTipoEmpresa: number): string {
    const tipoEmpresa = this.empresa.find(empresa => empresa.id_tipo_empresa === idTipoEmpresa);
    return tipoEmpresa ? tipoEmpresa.tipo_empresa : 'Desconocido';
  }

  getAllPyme(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
      responsive: true,
      search: true,
      dom: 'lfrtip', // Ejemplo de cadena de configuración
      
    };

    this._pymeService.getAllPymes().subscribe({
      next: (data) =>{
        this.pymesAll=data;
        this.listPymes = data;
        this.dtTrigger.next(null);
      }

    });


  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  
/**********************************************************/
// Variable de estado para alternar funciones
isActive = false;

toggleFunction(pyme: any, i: number) {
  // Cambia el estado en cada clic
  this.isActive = !this.isActive;

  // Ejecuta una función u otra según el estado
  if (pyme.estado === 2 ) {
    this.activarPyme(pyme, i); // Ejecuta la primera función
  } else {
    this.inactivarPyme(pyme, i); // Ejecuta la segunda función
  }
}
  
  activarPyme(nombre_pyme: any, i: number) {
    this._pymeService.activarPyme(nombre_pyme).subscribe(data =>
      this.toastr.success('La Pyme: ' + nombre_pyme.nombre_pyme + ' ha sido activada')
    );
    this.pymesAll[i].estado = 1;
  }

  inactivarPyme(nombre_pyme: any, i: number) {
    this._pymeService.inactivarPyme(nombre_pyme).subscribe(data =>
      this.toastr.success('La Pyme: ' + nombre_pyme.nombre_pyme + ' ha sido inactivada')
    );
    this.pymesAll[i].estado = 2;
  }
/*****************************************************************************************************/

generatePDF() {

  const {jsPDF} = require ("jspdf");
 
  const doc = new jsPDF();
  const data: any[][] =[]
  const headers = ['Nombre Pyme', 'Categoria', 'Descripcion', 'Creado', 'Estado'];

  // Recorre los datos de tu DataTable y agrégalo a la matriz 'data'
  this.pymesAll.forEach((pyme, index) => {
    const row = [
      pyme.nombre_pyme,
      pyme.categoria,
      pyme.descripcion,
      pyme.creado_por,
      this.getEstadoText(pyme.estado) // Función para obtener el texto del estado
    ];
    data.push(row);
  });

  doc.autoTable({
    head: [headers],
    body: data,
  });

  //doc.save('Pymes.pdf');
  //doc.output('dataurlnewwindow');
  doc.output('dataurlnewwindow', null, 'Pymes.pdf');
}

getEstadoText(estado: number): string {
  switch (estado) {
    case 1:
      return 'Activo';
    case 2:
      return 'Inactivo';
    case 3:
      return 'Vencido';
    case 4:
      return 'Bloqueado';
    default:
      return 'Desconocido';
  }
}


/**************************************************************/
  agregarNuevaPyme() {
    this.nuevaPyme={
      id_pyme: 0,
      id_tipo_empresa:this.nuevaPyme.id_tipo_empresa,
      nombre_pyme: this.nuevaPyme.nombre_pyme,
      categoria: this.nuevaPyme.categoria,
      descripcion: this.nuevaPyme.descripcion,
      creado_por: 'ISMAELM',
      fecha_creacion: new Date(),
      modificado_por: 'ISMAELM',
      fecha_modificacion: new Date(),
      estado: 1
    };

    this._pymeService.addPyme(this.nuevaPyme).subscribe(
      data => {
        this.toastr.success('Pyme agregada con éxito');
        location.reload();
      },
      error => {
        console.error('Error al agregar la Pyme:', error);
        // Puedes mostrar un mensaje de error o tomar medidas adicionales aquí.
      }
    );
  }
    


/*******************************************************************************/
  onInputChange(event: any, field: string) {
    if (field === 'nombre_pyme' || field === 'descripcion') {
      const inputValue = event.target.value;
      const uppercaseValue = inputValue.toUpperCase();
      event.target.value = uppercaseValue;
    }
  }



/************************************************************************************/
  obtenerIdPyme(pyme: Pyme, i: any) {
    this.pymeEditando = {
      id_pyme: pyme.id_pyme,
      id_tipo_empresa:pyme.id_tipo_empresa,
      nombre_pyme: pyme.nombre_pyme,
      categoria: pyme.categoria,
      descripcion:pyme.descripcion,
      creado_por: pyme.creado_por,
      fecha_creacion: pyme.fecha_creacion,
      modificado_por: pyme.modificado_por,
      fecha_modificacion: pyme.fecha_modificacion,
      estado: pyme.estado
    };
    this.indice = i;
  }


  /************************************************************************/


  
 /* editarUsuario(rol: any) {
    this._userService.editarUsuario(this.usuarioEditando).subscribe(data => {
      this.toastr.success('Usuario editado con éxito');
      if(this.usuariosAllRoles == null){
        //no se puede editar el usuario
      }else{
      this.usuariosAllRoles[this.indice].usuario = this.usuarioEditando.usuario;
      this.usuariosAllRoles[this.indice].nombre_usuario = this.usuarioEditando.nombre_usuario;
      this.usuariosAllRoles[this.indice].correo_electronico = this.usuarioEditando.correo_electronico;
      this.usuariosAllRoles[this.indice].roles.rol = rol.rol;
      this.usuariosAllRoles[this.indice].fecha_vencimiento = this.usuarioEditando.fecha_vencimiento; 
      }

        // Recargar la página
        location.reload();
        // Actualizar la vista
        this.ngZone.run(() => {        
        });

    });
  }*/

  deletePyme(id_pyme: number, i: number) {
    if (id_pyme !== undefined) {
      this._pymeService.deletePyme(id_pyme).subscribe(
        (data) => {
          // Elimina la pyme de la lista actual en el componente después de la eliminación
          this.pymesAll.splice(i, 1);
          this.toastr.success('La Pyme ha sido eliminada con éxito');
        },
        (error) => {
          console.error('Error al eliminar la pyme', error);
          this.toastr.error('Error al eliminar la Pyme');
        }
      );
    } else {
      console.error('El valor de id_pyme es indefinido o no válido.');
    }
  }
  
  



}
