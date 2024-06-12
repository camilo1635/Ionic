export class sitesList{
    id: string | null = "";
    nombre: string = "";
    fechaRegistro: Date = new Date();

  constructor() {
    this.fechaRegistro = new Date();
  }
}