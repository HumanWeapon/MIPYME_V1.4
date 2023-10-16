import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { ObjetosComponent } from './mantenimiento/objetos/objetos.component';
import { PermisosComponent } from './mantenimiento/permisos/permisos.component';
import { RolesComponent } from './mantenimiento/roles/roles.component';
import { Tabla2Component } from './mantenimiento/tabla2/tabla2.component';
import { PreguntasComponent } from './mantenimiento/preguntas/preguntas.component';


const routes: Routes = [
  {path:'dashboard',component:PagesComponent, 
  children:[
    {path:' ', component:DashboardComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'objetos', component: ObjetosComponent},
    {path: 'permisos', component: PermisosComponent},
    {path: 'roles', component: RolesComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'table2', component: Tabla2Component},
    {path: 'form-group', component: UsuariosComponent},
    {path: 'preguntas', component: PreguntasComponent},
  ]}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[
    RouterModule
  ]
})
export class PagesRoutingModule { }