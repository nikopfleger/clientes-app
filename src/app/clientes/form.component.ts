import { Component, OnInit } from '@angular/core'
import { Cliente } from './cliente'
import {ClienteService} from './cliente.service'
import { Router, ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2'
import { Region } from './region'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'] //las hojas de estilo
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente()
  titulo:string = "Crear Cliente"
  regiones: Region[]

  errores: string[]

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) {
      this.errores = []
   }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente )
      }
    })
    this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones)
  }

  public create(): void {
    console.log("Clicked!")
    console.log(this.cliente)
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con éxito`, 'success' )
        //ESTO SI MANEJO EN FORMA MANUAL EL TIPO DE DATO
      },
      err => {
        this.errores = err.error.errors as string[]
        console.error('Código del error desde el backend: ' + err.status)
        console.error(err.error.errors);
      }
    );
  }

  update():void {
    this.clienteService.update(this.cliente)
    .subscribe(
      response => {
            this.router.navigate(['/clientes'])
            Swal.fire('Cliente actualizado!', `${response.mensaje}: ${response.cliente.nombre}`, 'success' )
      },
      err => {
        this.errores = err.error.errors as string[]
        console.error('Código del error desde el backend: ' + err.status)
        console.error(err.error.errors);
      }
    )
  }

  compararRegion(o1:Region, o2:Region) {
    if (o1 === undefined && o2 === undefined) {
      return true
    }
    return (o1 === null || o2 === null || o1 === undefined || o2 === undefined)? false: o1.id===o2.id
  }

}
