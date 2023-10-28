import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './inicio/perfil/perfil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ObjetosComponent } from './mantenimiento/objetos/objetos.component';
import { RolesComponent } from './mantenimiento/roles/roles.component';
import { PermisosComponent } from './mantenimiento/permisos/permisos.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";
import { MatIconModule } from '@angular/material/icon';
import { PreguntasComponent } from './mantenimiento/preguntas/preguntas.component';
import { ParametrosComponent } from './mantenimiento/parametros/parametros.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProductosComponent } from './empresas/productos/productos.component';
import { ContactosComponent } from './empresas/contacto/contactos.component';
import { RequisitosComponent } from './empresas/requisitos/requisitos.component';
import { PerfilPymeComponent } from './inicio/perfil-pyme/perfil-pyme.component';


@NgModule({
  declarations: [
    MantenimientoComponent,
    InicioComponent,
    PerfilComponent,
    DashboardComponent,
    PagesComponent,
    ObjetosComponent,
    RolesComponent,
    PermisosComponent,
    UsuariosComponent,
    PreguntasComponent,
    ParametrosComponent,
    ProductosComponent,
    ContactosComponent,
    RequisitosComponent,
    PerfilPymeComponent,


  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    MatIconModule,
    BsDatepickerModule.forRoot()
  ],
  exports:[
    DashboardComponent,
    InicioComponent,
    PerfilComponent,
    PagesComponent,
    MantenimientoComponent
  ]
})
export class PagesModule { }
