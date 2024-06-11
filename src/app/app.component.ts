import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home/home.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonicModule, HomePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {}