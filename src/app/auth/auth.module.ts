import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { LoginPymeComponent } from './login-pyme/login-pyme.component';
import { RegisterPymeComponent } from './register-pyme/register-pyme.component';
import { FormPreguntasComponent } from './form-preguntas/form-preguntas.component';


@NgModule({
  declarations: [
    LoginComponent,
    SpinnerComponent,
    LoginPymeComponent,
    RegisterPymeComponent,
    FormPreguntasComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AuthModule { }