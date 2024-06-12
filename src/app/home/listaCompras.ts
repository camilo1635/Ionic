export class listaCompras {
  id: string | null = null;
  title: string | null = "" // Propiedad title sin valor por defecto
  sitio: string = '';
  fechaRegistro: string = "";

  constructor(title: string = '') { // Parámetro opcional con valor por defecto
    this.title = title; // Asigna el valor del parámetro a la propiedad title
    const currentDate: Date = new Date();
    const year: number = currentDate.getFullYear();
    const month: string = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day: string = ('0' + currentDate.getDate()).slice(-2);
    this.fechaRegistro = `${year}-${month}-${day}`;
  }
}