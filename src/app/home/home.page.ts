import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonButtons, IonList, IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/angular/standalone';
import { Task } from './task';
import { listaCompras } from './listaCompras';
import { sitesList } from './sitesList';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, push, set, remove, onChildAdded, onChildChanged, onChildRemoved } from "firebase/database";
import { Title } from '@angular/platform-browser';
import { ProductModalComponent } from './../product-modal.component';
import { SiteModalComponent } from './../site-modal.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ModalController } from '@ionic/angular';

const firebaseConfig = {
  apiKey: "AIzaSyDPeDkIcltFwDgAS6FpV4mG6vKU7KdWY_4",
  authDomain: "ionictodolist-68636.firebaseapp.com",
  projectId: "ionictodolist-68636",
  storageBucket: "ionictodolist-68636.appspot.com",
  messagingSenderId: "958001760857",
  appId: "1:958001760857:web:bdcfc666d3b8b7c632bf48"
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [NgClass, IonItemOption, IonItemOptions, IonItemSliding, NgFor, IonLabel, IonItem, IonList, IonButtons, IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class HomePage {
  taskList;
  tasks: Array<Task> = [];
  sites: Array<sitesList> = [];
  app = initializeApp(firebaseConfig);
  db = getDatabase(this.app);

  constructor(private modalController: ModalController) {
    this.taskList = ref(this.db, 'tasks');
    this.loadTasks();
    this.loadSites();
  }

  loadTasks() {
    onChildAdded(this.taskList, (data) => {
      this.tasks.unshift({ id: data.key, title: data.val().title, sitio: data.val().sitio, fecha: data.val().fecha });
    });

    onChildChanged(this.taskList, (data) => {
      const task = { id: data.key, title: data.val().title, sitio: data.val().sitio, fecha: data.val().fecha };
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index > -1) {
        this.tasks[index] = task;
      }
    });

    onChildRemoved(this.taskList, (data) => {
      const task = { id: data.key, title: data.val().title, sitio: data.val().sitio, fecha: data.val().fecha };
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index > -1) {
        this.tasks.splice(index, 1);
      }
    });

    onValue(this.taskList, (snapshot) => {
      const misdatos = snapshot.val();
      if (misdatos) {
        this.tasks = Object.keys(misdatos).map(key => ({ id: key, ...misdatos[key] }));
      }
    });
  }

  loadSites() {
    const sitesRef = ref(this.db, 'sites');
    onValue(sitesRef, (snapshot) => {
      this.sites = [];
      snapshot.forEach((childSnapshot) => {
        const site = childSnapshot.val() as sitesList;
        site.id = childSnapshot.key;
        this.sites.push(site);
      });
    });
  }

  async openProductModal() {
    const modal = await this.modalController.create({
      component: ProductModalComponent,
      componentProps: {
        sites: this.sites
      }
    });

    modal.onDidDismiss().then((detail) => {
      if (detail.data) {
        this.addProduct(detail.data);
      }
    });

    return await modal.present();
  }

  async openSiteModal() {
    const modal = await this.modalController.create({
      component: SiteModalComponent
    });

    modal.onDidDismiss().then((detail) => {
      if (detail.data) {
        this.addSite(detail.data);
      }
    });

    return await modal.present();
  }

  addProduct(product: listaCompras) {
    const newProduct = new listaCompras();
    newProduct.id = product.id;
    newProduct.fechaRegistro = product.fechaRegistro;

    const productCol = ref(this.db, 'products');
    const newProductRef = push(productCol);
    newProduct.id = newProductRef.key;

    set(newProductRef, newProduct).then(() => {
      console.log("Product added successfully!");
    }).catch((error) => {
      console.error("Error adding product: ", error);
    });
  }

  addSite(site: sitesList) {
    const newSite = new sitesList();
    newSite.id = site.id;
    newSite.nombre = site.nombre;
    newSite.fechaRegistro = site.fechaRegistro;

    const siteCol = ref(this.db, 'sites');
    const newSiteRef = push(siteCol);
    newSite.id = newSiteRef.key;

    set(newSiteRef, newSite).then(() => {
      console.log("Site added successfully!");
    }).catch((error) => {
      console.error("Error adding site: ", error);
    });
  }

  addItem() {
    this.openProductModal();
  }

  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }

  markAsDone(task: Task) {
    task.sitio = 'done';
    const taskRef = ref(this.db, 'tasks/' + task.id);
    set(taskRef, task);
  }

  removeTask(task: Task) {
    const taskRef = ref(this.db, 'tasks/' + task.id);
    remove(taskRef).then(() => {
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index > -1) {
        this.tasks.splice(index, 1);
      }
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
}
