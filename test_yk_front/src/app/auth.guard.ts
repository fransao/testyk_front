import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Verifica si el token de autenticación existe en el localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      return true; // Si el token está presente, permite el acceso
    } else {
      this.router.navigate(['/login']); // Si no hay token, redirige a login
      return false;
    }
  }
}
