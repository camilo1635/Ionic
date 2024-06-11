import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomePage } from './home/home.page';


@NgModule({
    declarations: [
        HomePage
    ],
    imports: [
      BrowserModule
    ],
    providers: [],
    bootstrap: [HomePage]
})

export class AppModule { }
  
