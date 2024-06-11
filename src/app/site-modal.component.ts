import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgFor, NgClass } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonButtons, IonList, IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonInput, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
//import { ReactiveFormsModule } from '@angular/forms'; 
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './site-modal.component.html',
    standalone: true,
    imports: [NgClass, IonItemOption, IonItemOptions, IonItemSliding, NgFor, IonLabel, IonItem, IonList, IonButtons, IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent,IonInput, IonSelect, IonSelectOption,FormsModule ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SiteModalComponent {
  @Output() siteSaved = new EventEmitter<{ id: string, nombre: string, fechaRegistro: Date }>();

  newSite: { id: string, nombre: string, fechaRegistro: Date } = { id: '', nombre: '', fechaRegistro: new Date() };

  constructor(private modalController: ModalController) { }

  saveSite() {
    this.siteSaved.emit(this.newSite);
    this.dismissModal();
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}