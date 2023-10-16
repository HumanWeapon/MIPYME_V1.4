import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu:any[]=[

    {
      titulo:'Dashboard',
      url: ' ',
      icono: 'nav-icon fas fa-solid fa-user',
      submenu: []
    },
    {
      titulo:'Seguridad',
      url: ' ',
      icono: 'nav-icon fas fa-regular fa-building',
      submenu: [
        {titulo:'Usuarios', url: 'usuarios', icono: 'fa fa-users ml-1'},
        {titulo:'Objetos', url: 'objetos', icono: 'fa fa-cubes ml-1'},
        {titulo:'Permisos', url: 'permisos', icono: 'fa fa-user-shield ml-1'},
        {titulo:'Roles', url: 'roles', icono: 'fas fa-solid fa-street-view ml-1'},
        {titulo:'Preguntas', url: 'preguntas', icono: 'fas fa-solid fa-street-view ml-1'}
      ]
    },
    {
      titulo:'Administración',
      url: ' ',
      icono: 'nav-icon fas fa-regular fa-building',
      submenu: [
        {titulo:'Bitacora', url: ' ', icono: 'fa fa-users ml-1'},
        {titulo:'Backups', url: ' ', icono: 'fa fa-users ml-1'},
        {titulo:'Restaurar', url: ' ', icono: 'fa fa-user-shield ml-1'},
      ]
    },
    {
      titulo:'Empresas',
      url: ' ',
      icono: 'nav-icon fas fa-regular fa-building',
      submenu: [
        {titulo:'Contacto', url: ' ', icono: 'fa fa-users ml-1'},
        {titulo:'Requisitos', url: ' ', icono: 'fa fa-users ml-1'},
        {titulo:'Productos', url: ' ', icono: 'fa fa-user-shield ml-1'},
      ]
    },
    {
      titulo:'PYMES',
      url: ' ',
      icono: 'nav-icon fas fa-solid fa-user',
      submenu: []
    },
  ]
  constructor() { }
  
}
