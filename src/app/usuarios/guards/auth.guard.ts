import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service'

//LA VENTAJA DE LOS GUARD ES QUE NO TIENE QUE IR AL BACKEND PARA VER SI ESTA EXPIRADO O AUTENTICADO

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  //CREAR CONSTRUCTOR: NOTA, MIRAR AuthGuard EN APP.MODULE.TS HAY QUE AGREGAR COSAS AHI
  constructor(private authService: AuthService, private router: Router) {

  }

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.isAuthenticated()) {
        if (this.isTokenExpirado()) {
          this.authService.logout();
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }

    isTokenExpirado(): boolean {
      let token = this.authService.token;
      let payload = this.authService.obtenerPayload(token)
      let now = new Date().getTime() / 1000;
      if (payload.exp < now) {
        return true;
      }
      return false;
    }
  }
