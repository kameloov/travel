import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyOffersPage } from './my-offers';

@NgModule({
  declarations: [
    MyOffersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyOffersPage),
  ],
})
export class MyOffersPageModule {}
