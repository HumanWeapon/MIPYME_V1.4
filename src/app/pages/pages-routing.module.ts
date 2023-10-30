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
import { RequisitoComponent } from './empresas/requisitos/requisitos.component';
import { PerfilPymeComponent } from './inicio/perfil-pyme/perfil-pyme.component';
import { CiudadesComponent } from './empresas/ciudades/ciudades.component';
import { TipoDireccionComponent } from './empresas/tipo-direccion/tipo-direccion.component';
import { TipoContactoComponent } from './empresas/tipo-contacto/tipo-contacto.component';
import { ContactoComponent } from './empresas/contacto/contacto.component';
import { TipoEmpresaComponent } from './empresas/tipo-empresa/tipo-empresa.component';
import { ContactoTelefonoComponent } from './empresas/contacto-telefono/contacto-telefono.component';
import { CategoriaComponent } from './empresas/categoria-producto/categoria.component';
import { BitacoraComponent } from './mantenimiento/bitacora/bitacora.component';
import { PymesComponent } from './empresas/pymes/pymes.component';




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
    {path: 'requisitos', component:RequisitoComponent, data:{titulo: 'Requisitos'}},
    {path: 'perfil-pyme', component:PerfilPymeComponent, data:{titulo: 'Mi Perfil Pyme'}},
    {path: 'ciudades', component:CiudadesComponent, data:{titulo: 'Ciudades'}},
    {path: 'tipoDireccion', component:TipoDireccionComponent, data:{titulo: 'Tipo de Direccion'}},
    {path: 'tipoContacto', component:TipoContactoComponent, data:{titulo: 'Tipo de Contacto'}},
    {path: 'tipoEmpresa', component:TipoEmpresaComponent, data:{titulo: 'Tipo de Empresa'}},
    {path: 'contacto', component:ContactoComponent, data:{titulo: 'Contacto'}},
    {path: 'contactoTelefono', component:ContactoTelefonoComponent, data:{titulo: 'Contacto de Telefono'}},
    {path: 'tipoDireccion', component:TipoDireccionComponent, data:{titulo: 'Tipo Direccion'}},
    {path: 'tipoContacto', component:TipoContactoComponent, data:{titulo: 'Tipo Contacto'}},
    {path: 'contacto', component:ContactoComponent, data:{titulo: 'Contacto'}},
    {path: 'contactoTelefono', component:ContactoTelefonoComponent, data:{titulo: 'Contacto Telefono'}},
    {path: 'categoriaproducto', component:CategoriaComponent, data:{titulo: 'Categoría de productos'}},
    {path: 'bitacora', component:BitacoraComponent, data:{titulo: 'Bitácora'}},
    {path: 'pymes', component:PymesComponent,data:{titulo:'Pymes'}},
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