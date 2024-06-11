import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app/app.component'; 
import { environment } from './environments/environment';
import { addIcons } from 'ionicons';
import { add, checkmark, trash } from 'ionicons/icons';

addIcons({
  'add': add,
  'checkmark': checkmark,
  'trash': trash
});

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent) 
  .catch(err => console.error(err));