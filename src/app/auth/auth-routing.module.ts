import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { RegisterPymeComponent } from './register-pyme/register-pyme.component';
import { LoginPymeComponent } from './login-pyme/login-pyme.component';
import { FormPreguntasComponent } from './form-preguntas/form-preguntas.component';




const routes: Routes =[
  {path: 'login', component: LoginComponent},
  {path: 'loginpyme', component: LoginPymeComponent},
  {path: 'registerpyme', component: RegisterPymeComponent},
  {path: 'preguntas', component: FormPreguntasComponent},
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
export class AuthRoutingModule { }
