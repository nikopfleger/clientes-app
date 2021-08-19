import { Component } from '@angular/core';
import { AuthService } from '../usuarios/auth.service'
import { Router } from '@angular/router'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] //las hojas de estilo
})
export class HeaderComponent {
 title: string = 'App Angular'

 constructor(private _authService: AuthService, private router: Router) {

 }

 public get authService(): AuthService {
   return this._authService
 }

 logout():void{
   let username = this.authService.usuario.username
   this._authService.logout()
   Swal.fire('Logout', `Hola ${username}, has cerrado sesión`, 'success')
   this.router.navigate(['/login'])
 }
}
