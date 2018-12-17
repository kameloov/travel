import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RequestsProvider } from '../../providers/requests-service/requests-service';
import { Category } from '../../models/Category';
import { Observable } from 'rxjs/Observable';
import { ServiceResponse } from '../../models/ServiceResponse';

/**
 * Generated class for the RequestListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-list',
  templateUrl: 'request-list.html',
})
export class RequestListPage {
  public categoryList$ : Observable<ServiceResponse>;
  public requestList$  : Observable<Request []>;
  public categoryId: number =0;
  constructor(public navCtrl: NavController, public requestService : RequestsProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestListPage');
    this.categoryList$ = this.requestService.getCategories();
    this.requestList$ = this.requestService.getRequests(this.categoryId);
  }

  public setCategory(){
    this.requestList$ = this.requestService.getRequests(this.categoryId);
  }
  ionViewDidEnter(){

  }


}
