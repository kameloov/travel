import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests-service/requests-service';
import { Request } from '../../models/Request';
import { AlertProvider } from '../../providers/alert/alert';

/**
 * Generated class for the AddRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-request',
  templateUrl: 'add-request.html',
})
export class AddRequestPage {
  public request : Request;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     public requestService : RequestsProvider,private msg : AlertProvider) {
  }

  add(){
    this.requestService.addRequest(this.request).subscribe(data=>{
      if (data){

      } else
      
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRequestPage');
  }

}
