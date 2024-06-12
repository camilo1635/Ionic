export class listaCompras{
  id: string | null = null;
  title: string = '';
  sitio: string = '';
  fechaRegistro: Date = new Date();

  constructor() {
    this.fechaRegistro = new Date();
  }
}