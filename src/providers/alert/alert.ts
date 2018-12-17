import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';

/*
  Generated class for the AlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertProvider {

  constructor(public alertCtrl : AlertController,public toastCtrl : ToastController) {
    console.log('Hello AlertProvider Provider');
  }

  showAlert(mg : string){
    this.alertCtrl.create()
  }

  showToast(text : string){
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
  }

}
