import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ],
  exports: [
    IonicModule
  ]
})
export class SharedModule {}