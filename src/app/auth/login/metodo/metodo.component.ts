import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-metodo',
  templateUrl: './metodo.component.html',
  styleUrls: ['./metodo.component.css']
})
export class MetodoComponent {

  selectedOption: string = 'correo'; // Valor predeterminado

  constructor(private router: Router){}


  // ...

  onSubmit() {
    // Aquí puedes acceder a this.selectedOption para determinar cuál opción se seleccionó
    if (this.selectedOption === 'correo') {
      // Navegar al método de restablecer contraseña por correo electrónico
    } else if (this.selectedOption === 'preguntas') {
      // Navegar al método de restablecer contraseña por preguntas de seguridad
      this.navigatePreguntas();
    }
  }

  navigateLogin() {
    this.router.navigate(['/login'])
  }

  navigatePreguntas() {
    this.router.navigate(['/preguntas'])
  }
}
