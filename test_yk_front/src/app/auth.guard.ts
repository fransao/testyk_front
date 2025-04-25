import { inject } from '@angular/core';
import { Router } from '@angular/router';


export const authGuard = () => {
  const router = inject(Router);
  console.log('[AuthGuard] Ejecutado');

  if (typeof window !== 'undefined') {
    console.log('[AuthGuard] window definido');
    const token = localStorage.getItem('authToken');
    console.error('[AuthGuard] token es: ', token);
    if (token) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }

  console.log('[AuthGuard] negar el acceso');
  // En SSR, negar acceso
  router.navigate(['/login']);
  return false;
};

/*
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Verifica si el token de autenticación existe en el localStorage

    console.log('Guard activado');

    if (!(typeof window !== 'undefined' && localStorage)) {
      console.error('[AuthGuard] localStorage no definido');
      return false;
      // continuar lógica
    }

    const token = localStorage.getItem('authToken');

    if (token) {
      console.error('can activate: token true', token);
      return true; // Si el token está presente, permite el acceso
    } else {
      console.error('can activate: token false', token);
      this.router.navigate(['/login']); // Si no hay token, redirige a login
      return false;
    }
  }
}
*/