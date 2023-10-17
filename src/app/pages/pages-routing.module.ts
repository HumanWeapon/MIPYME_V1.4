import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { ObjetosComponent } from './mantenimiento/objetos/objetos.component';
import { PermisosComponent } from './mantenimiento/permisos/permisos.component';
import { RolesComponent } from './mantenimiento/roles/roles.component';
import { PreguntasComponent } from './mantenimiento/preguntas/preguntas.component';
import { ParametrosComponent } from './mantenimiento/parametros/parametros.component';
import { PerfilComponent } from './inicio/perfil/perfil.component';




const routes: Routes = [
  {path:'dashboard',component:PagesComponent, 
  children:[
    {path:' ', component:DashboardComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'objetos', component: ObjetosComponent},
    {path: 'permisos', component: PermisosComponent},
    {path: 'roles', component: RolesComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'form-group', component: UsuariosComponent},
    {path: 'preguntas', component: PreguntasComponent},
    {path: 'parametros', component: ParametrosComponent},
    {path: 'perfil', component: PerfilComponent},
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