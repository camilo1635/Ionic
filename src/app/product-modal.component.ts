import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgFor, NgClass } from '@angular/common';
//import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonButtons, IonList, IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonInput, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
//import { ReactiveFormsModule } from '@angular/forms'; 
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from './shared.module';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  standalone: true,
  imports: [NgClass, SharedModule, NgFor, FormsModule ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductModalComponent {
  @Input() sites: any[] = [];
  @Output() productSaved = new EventEmitter<{ title: string, sitio: string }>();
  @Output() newSiteRequested = new EventEmitter();

  newProduct: { title: string, sitio: string } = { title: '', sitio: '' };

  constructor(private modalController: ModalController) { }

  saveProduct() {
    this.productSaved.emit(this.newProduct);
    this.dismissModal();
  }

  requestNewSite() {
    this.modalController.dismiss({ newSiteRequested: true });
  }
  

  dismissModal() {
    this.modalController.dismiss();
  }
}
