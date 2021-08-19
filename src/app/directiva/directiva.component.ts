import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
})
export class DirectivaComponent {

  listaCurso: string[] = ['TypeScript', 'JavaScript' , 'Java SE', 'C#', 'PHP'];
  habilitar: boolean = true;
  constructor() { }


  setHabilitar(): void {
    this.habilitar = (this.habilitar==true)?false:true;
  }

  mensajeBoton(): string {
    return (this.habilitar==true)?'Ocultar':'Mostrar';
  }

}
