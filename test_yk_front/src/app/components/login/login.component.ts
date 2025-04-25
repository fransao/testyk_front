import { Component, OnInit } from '@angular/core';
import {CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';  // Asegúrate de importar FormsModule

@Component({
  selector: 'app-login',
  standalone: true,  // Define el componente como standalone
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],  // Asegúrate de incluir FormsModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loginForm: FormGroup;

  constructor(public fb: FormBuilder, private apiService: ApiService, private router: Router) { 
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }


  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this.apiService.login(username, password).subscribe(
        (response) => {
          console.error('response autenticación', response);
          // Guardar el token de autenticación (si es necesario) y redirigir
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/dashboard']); // Redirigir a Dashboard si login es exitoso
        },
        (error) => {
          console.error('Error de autenticación', error);
          //this.router.navigate(['/dashboard']); // Redirigir a Dashboard si login es exitoso
        }
      );
    
    } else {
      this.errorMessage = 'El usuario y la contraseña son obligatorios.';
      return; // Sale de la función si los campos están vacíos
    }
    
    
  }

  get f() {
    return this.loginForm.controls;
  }

}
