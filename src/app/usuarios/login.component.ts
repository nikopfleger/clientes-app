import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario'
import Swal from 'sweetalert2';
import { AuthService } from './auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = 'Por favor inicie sesión!'
  usuario: Usuario

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario()
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      Swal.fire('Login', `Hola ${this.authService.usuario.username} ya estás autenticado`, 'info')
      this.router.navigate(['/clientes'])
    }
  }

  login(): void {
    console.log(this.usuario)

    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire('Error Login', 'Username o password vacías', 'error')

      return
    }

    this.authService.login(this.usuario).subscribe(
      response =>
      {
        console.log(response)

        //Para guardar en sesión
        this.authService.guardarUsuario(response.access_token)
        this.authService.guardarToken(response.access_token)

        //no hace falta poner parentesis porque es un getter hecho con la variable _usuario
        let usuario = this.authService.usuario

        this.router.navigate(['/clientes'])
        Swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión con éxito`, 'success')
      },
      error => {
        if (error.status == 400) {
          Swal.fire('Error Login', 'Username o password incorrecto', 'error')
        }
      }
    )

  }

}