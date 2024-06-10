export class listaCompras{
    id: string | null = "";
    fechaRegistro: string ="";

    constructor() {
        const currentDate: Date = new Date();
        
        const year: number = currentDate.getFullYear();
        const month: string = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const day: string = ('0' + currentDate.getDate()).slice(-2);

        this.fechaRegistro = `${year}-${month}-${day}`;
    }
}