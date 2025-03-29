import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule

@Component({
  selector: 'app-login',
  standalone: true,  // Define el componente como standalone
  imports: [FormsModule],  // Asegúrate de incluir FormsModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  login() {
    this.apiService.login(this.username, this.password).subscribe(
      (response) => {
        // Guardar el token de autenticación (si es necesario) y redirigir
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/dashboard']); // Redirigir a Dashboard si login es exitoso
      },
      (error) => {
        console.error('Error de autenticación', error);
      }
    );
  }
}
