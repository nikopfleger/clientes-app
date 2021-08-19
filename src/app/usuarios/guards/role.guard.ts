import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service'
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  //CREAR CONSTRUCTOR: NOTA, MIRAR RoleGuard EN APP.MODULE.TS HAY QUE AGREGAR COSAS AHI
  constructor(private authService: AuthService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'])
      return false
    }
    let role = route.data['role'] as string
    console.log(role)
    if (this.authService.hasRole(role)) {
      return true
    }
    this.router.navigate(['/clientes'])
    Swal.fire('Acceso denegado', `${this.authService.usuario.username} no tienes acceso a este recurso`, 'warning')
    return false;
  }

}
