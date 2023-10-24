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
import { ProductosComponent } from './empresas/productos/productos.component';
import { ContactosComponent } from './empresas/contacto/contactos.component';
import { RequisitosComponent } from './empresas/requisitos/requisitos.component';




const routes: Routes = [
  {path:'dashboard',component:PagesComponent, 
  children:[
    {path:' ', component:DashboardComponent},
    {path: 'usuarios', component: UsuariosComponent, data:{titulo: 'Administrar Usuarios'}},
    {path: 'objetos', component: ObjetosComponent, data:{titulo: 'Administrar Objetos'}},
    {path: 'permisos', component: PermisosComponent, data:{titulo: 'Administrar Permisos'}},
    {path: 'roles', component: RolesComponent, data:{titulo: 'Administrar Roles'}},
    {path: 'dashboard', component: DashboardComponent, data:{titulo: 'Dashboard'}},
    {path: 'form-group', component: UsuariosComponent},
    {path: 'preguntas', component: PreguntasComponent, data:{titulo: 'Administrar Preguntas'}},
    {path: 'parametros', component: ParametrosComponent, data:{titulo: 'Administrar Parametros'}},
    {path: 'perfil', component: PerfilComponent, data:{titulo: 'Mi Perfil'}},
    {path: 'productos', component:ProductosComponent, data:{titulo: 'Producto'}},
    {path: 'contactos', component:ContactosComponent, data:{titulo: 'Contacto'}},
    {path: 'requisitos', component:RequisitosComponent, data:{titulo: 'Requisitos'}},
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