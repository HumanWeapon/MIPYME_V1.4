import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Preguntas } from 'src/app/interfaces/preguntas';
import { Preguntas_Usuario } from 'src/app/interfaces/preguntasUsuario';
import { PreguntasService } from 'src/app/services/preguntas.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  /*securityQuestions: Preguntas[] = [];
  resetPasswordForm: FormGroup | null = null; // Inicializa resetPasswordForm como nulo
  userAnswers: Preguntas_Usuario[] = [];
  userId: Preguntas_Usuario;

  constructor(
    private formBuilder: FormBuilder,
    private _preguntasSeguridadService: PreguntasService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Se obtiene el ID de usuario de la ruta actual si está presente
    const userIdFromRoute = this.route.snapshot.paramMap.get('userId');
    this.userId.id_usuario = 57;
    // Se verifica si userIdFromRoute no es nulo antes de continuar
    if (userIdFromRoute !== null) {
      // Convierte userIdFromRoute a un número
      const numericUserId = +userIdFromRoute;

      // Asigna el valor a userId
      this.userId.id_usuario = numericUserId;

      // Llama al servicio solo si userId es un número válido
      if (!isNaN(this.userId.id_usuario)) {
        // Obtiene las preguntas de seguridad por usuario desde la API
        this._preguntasSeguridadService.getPreguntasPorUsuario(this.userId)
          .subscribe((questions) => {
            this.securityQuestions = questions;

            // Crea dinámicamente los controles del formulario
            const formControls: { [key: string]: any } = {};
            for (const question of questions) {
              formControls[`answer${question.id_pregunta}`] = ['', Validators.required];
            }
            this.resetPasswordForm = this.formBuilder.group(formControls);
          });
      }
    }
  }

  onSubmit(): void {
    // Implementa el manejo de envío del formulario aquí
    // Verifica las respuestas del usuario en this.userAnswers
    // this.userAnswers contiene las respuestas seleccionadas por el usuario
  }*/
}
