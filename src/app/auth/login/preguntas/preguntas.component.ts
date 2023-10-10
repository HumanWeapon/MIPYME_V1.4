import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { PreguntasUsuarioService } from 'src/app/services/preguntas-usuario.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

  datos: any;
  securityForm: FormGroup;
  preguntasRespuestas: any[] = []

  constructor(
    private fb: FormBuilder,
    private _preguntasUsuario: PreguntasUsuarioService,
    private router: Router
    ){
      this.securityForm = this.fb.group({});
  }

  ngOnInit(): void {
    // Llama al servicio para obtener las preguntas y respuestas desde la API
    this._preguntasUsuario.validatePreguntas().subscribe((data) => {
      this.preguntasRespuestas = data;
      this.crearFormulario();
    });
  }

  crearFormulario() {
    const formGroup: { [key: string]: any } = {}; // Declaración explícita del tipo de formGroup
  
    for (const item of this.preguntasRespuestas) {
      formGroup[item.id_pregunta] = [
        '', // Valor inicial del campo de respuesta
        Validators.required, // Validador requerido
      ];
    }
  
    this.securityForm = this.fb.group(formGroup);
  }

  onSubmit() {
    if (this.securityForm.valid) {
      // Recopila las respuestas del usuario y compáralas con las de la API
      const respuestasUsuario = this.securityForm.value;

      for (const item of this.preguntasRespuestas) {
        const respuestaUsuario = respuestasUsuario[item.id_pregunta];
        const respuestaCorrecta = item.respuesta;

        if (respuestaUsuario !== respuestaCorrecta) {
          // Las respuestas no coinciden, puedes manejar esto como desees
          console.log('Respuesta incorrecta para la pregunta:', item.pregunta);
          return;
        }
      }

      // Todas las respuestas son correctas, puedes continuar con la lógica deseada
      console.log('Todas las respuestas son correctas');
      this.navigateRecuperar();
    }
  }
  navigateRecuperar(){
    this.router.navigate(['/recuperar'])
  }

  
}
