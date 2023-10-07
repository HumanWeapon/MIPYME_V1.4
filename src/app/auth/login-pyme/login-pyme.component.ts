import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-pyme',
  templateUrl: './login-pyme.component.html',
  styleUrls: ['./login-pyme.component.css']
})
export class LoginPymeComponent {

  usuario: string = '';
  contrasena: string = '';
  loading: boolean = false;


  constructor(private router: Router) {}
  
  navigateToRegister() {
    this.router.navigate(['/registerpyme']);
  }

  eliminarEspaciosBlanco() {
    this.usuario = this.usuario.replace(/\s/g, ''); // Elimina espacios en blanco
    this.usuario = this.usuario.toUpperCase(); // Convierte el texto a mayúsculas
    this.contrasena = this.contrasena.replace(/\s/g, ''); // Elimina espacios en blanco
  }

}
