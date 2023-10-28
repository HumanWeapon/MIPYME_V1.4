import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu:any[]=[

    {
      titulo:'Dashboard',
      url: 'dashboard',
      icono: 'nav-icon fas fa-solid fa-user',
      submenu: []
    },
    {
      titulo:'Seguridad',
      url: ' ',
      icono: 'nav-icon fas fa-solid fa-lock',
      submenu: [
        {titulo:'Usuarios', url: 'usuarios', icono: 'fa fa-users ml-1'},
        {titulo:'Objetos', url: 'objetos', icono: 'fa fa-cubes ml-1'},
        {titulo:'Permisos', url: 'permisos', icono: 'fa fa-user-shield ml-1'},
        {titulo:'Roles', url: 'roles', icono: 'fas fa-solid fa-users-gear ml-1'},
        {titulo:'Preguntas', url: 'preguntas', icono: 'fas fa-solid fa-circle-question ml-1'},
        {titulo:'Parametros', url: 'parametros', icono: 'fas fa-solid fa-chalkboard-user ml-1'}
      ]
    },
    {
      titulo:'Administración',
      url: ' ',
      icono: 'nav-icon fas fa-regular fa-building',
      submenu: [
        {titulo:'Bitacora', url: ' ', icono: 'fas fa-solid fa-list-check ml-1'},
        {titulo:'Backups', url: ' ', icono: 'fa fa-users ml-1'},
        {titulo:'Restaurar', url: ' ', icono: 'fa fa-user-shield ml-1'},
      ]
    },
    {
      titulo:'Empresas',
      url: ' ',
      icono: 'nav-icon fas fa-regular fa-building',
      submenu: [
        {titulo:'Contactos', url: 'contactos', icono: 'fa fa-users ml-1'},
        {titulo:'Requisitos', url: 'requisitos', icono: 'fa fa-users ml-1'},
        {titulo:'Productos', url: 'productos', icono: 'fa fa-user-shield ml-1'},
      ]
    },
    {
      titulo:'PYMES',
      url: ' ',
      icono: 'nav-icon fas fa-solid fa-user',
      submenu: [
        {titulo:'Consultar', url: '', icono: 'fa fa-users ml-1'},
        {titulo:'Mis Consultas', url: '', icono: 'fa fa-users ml-1'},
        {titulo:'Mi Perfil', url: 'perfil-pyme', icono: 'fa fa-solid fa-user ml-1'},
      ]
    },
  ]
  constructor() { }
  
}
