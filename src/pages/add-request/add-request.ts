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

  public request: Request;
  public loading: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public requestService: RequestsProvider, private msg: AlertProvider) {
  }

  add() {
    this.loading = true;
    this.requestService.addRequest(this.request).subscribe(data => {
      if (data) {
        this.loading = false;
        if (data['success'] == 1)
          this.msg.showToast('Added successfully');
        else
          this.msg.showToast(data['message']);
      } else
        this.msg.showToast('Error , failed to add request');
    }, err => {
      this.loading = false;
      this.msg.showToast('Error , failed to add request');
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRequestPage');
  }

}
