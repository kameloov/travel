import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RequestsProvider } from '../../providers/requests-service/requests-service';
import { Category } from '../../models/Category';
import { Observable } from 'rxjs/Observable';
import { ServiceResponse } from '../../models/ServiceResponse';
import { SERVICE_URl, User } from '../../providers';
import { AccountInfo } from '../../models/AccountInfo';

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
  public requestList$  : Observable<Request []>;
  public countryID: number =0;
  public  img_url = SERVICE_URl+"icons/";
  public account : AccountInfo;

  constructor(public navCtrl: NavController, public requestService : RequestsProvider, public user : User) {
     
  }

  public viewUser(userId : number){
    this.navCtrl.push('UserProfilePage',{id : userId});
  }

  ionViewDidLoad() {
   
  }


  showDetails(r : Request){
    this.navCtrl.push('RequestDetailsPage',{request : r});
  }
  
  
  ionViewDidEnter(){
    this.user.getUser().then(data=>{
      console.log(JSON.stringify(data));
      this.account = data;
      console.log('ionViewDidLoad RequestListPage');
      this.requestList$ = this.requestService.getRequests(this.account.country_id);
    });
  }
}
