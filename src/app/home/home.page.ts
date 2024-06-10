import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonButtons, IonList, IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/angular/standalone';
import { Task } from './task';
import { listaCompras } from './listaCompras';
import { initializeApp } from "firebase/app";
import { DocumentData, CollectionReference, collection, getDocs, getFirestore } from "firebase/firestore/lite";
import { getDatabase, onValue, ref, push, set, remove, onChildAdded, onChildChanged, onChildRemoved } from "firebase/database";
import { Title } from '@angular/platform-browser';

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
  imports: [NgClass, IonItemOption, IonItemOptions, IonItemSliding, NgFor, IonLabel, IonItem, IonList, IonButtons, IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})

export class HomePage {

  taskList;
  tasks: Array<Task> = [];
  app = initializeApp(firebaseConfig);
  db = getDatabase(this.app);

  constructor() {
    this.taskList = ref(this.db, 'tasks');

    onChildAdded(this.taskList, (data) => {
      this.tasks.unshift( { id: data.key, title: data.val().title, sitio: data.val().sitio, fecha: data.val().fecha } );
    });

    onChildChanged(this.taskList, (data) => {
      const task = { id: data.key, title: data.val().title, sitio: data.val().sitio, fecha: data.val().fecha};
      let index = this.tasks.indexOf(task);
      if (index > -1) {
        this.tasks.splice(index, 1);
      }
    });

    onChildRemoved(this.taskList, (data) => {
      const task = { id: data.key, title: data.val().title, sitio: data.val().sitio, fecha: data.val().fecha };
      let index = this.tasks.indexOf(task);
      if (index > -1) {
        this.tasks.splice(index, 1);
      }
    });

    onValue(this.taskList, (data) => {
      const misdatos = data.val();
      console.log(misdatos);
      console.log(JSON.stringify(misdatos));
      if (typeof(misdatos) != 'undefined') {
        misdatos.forEach( (element: Task) => {
          this.tasks.unshift( { id: element.id, title: element.title, sitio: element.sitio, fecha: element.fecha } );
        })
      }
    });
  }

  addItem() {
    let theNewTask = prompt("New Task", '');
    let theNewSite = prompt("New Site", '');
    if (theNewTask !== '' && theNewTask != null && theNewSite !== '' && theNewSite != null) {
      const newTask = new Task();
      newTask.title = theNewTask;
      newTask.sitio = theNewSite;
      newTask.id = null;

      const taskCol = ref(this.db, 'tasks');
      const newTaskRef = push(taskCol);
      newTask.id = newTaskRef.key;

      set(newTaskRef, newTask).then(() => {
        console.log("Task added successfully!");
      }).catch((error) => {
        console.error("Error adding task: ", error);
      });
    }
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
      let index = this.tasks.findIndex(t => t.id === task.id);
      if (index > -1) {
        this.tasks.splice(index, 1);
      }
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
}

