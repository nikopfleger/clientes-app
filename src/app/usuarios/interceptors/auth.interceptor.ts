import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {


    return next.handle(req).pipe(

      catchError(e => {

        if (e.status == 401) {
          if (this.authService.isAuthenticated()) {
            this.authService.logout(); //CUANDO EXPIRA EL TOKEN DEBO DESLOGUEAR
          }
          this.router.navigate(['/login']);

        }
        if (e.status == 403) { //FORBIDDEN
          this.router.navigate(['/clientes'])
          Swal.fire('Acceso denegado', `${this.authService.usuario.username} no tienes acceso a este recurso`, 'warning')

        }
        return throwError(e)


      })

    );
  }
}
