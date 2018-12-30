import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { SERVICE_URl, User } from '../../providers';
import { RequestsProvider } from '../../providers/requests-service/requests-service';
import { Request } from '../../models/Request';
import { AlertProvider } from '../../providers/alert/alert';

/**
 * Generated class for the MyRequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-requests',
  templateUrl: 'my-requests.html',
})
export class MyRequestsPage {
  public requestList$  : Observable<Request []>;
  public  img_url = SERVICE_URl+"icons/";

  constructor(public navCtrl: NavController, public requestService : RequestsProvider,public user :User,
    private msg : AlertProvider) {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestListPage');
    this.user.getUser().then(data=>{
      this.requestList$ = this.requestService.getUserRequests(data['id']);
    })
    
  }

  delete(r : Request){
    this.requestService.delete(r).subscribe(data=>{
      if (data && data['success']==1){
        this.requestService.refreshUserRequests();
      } else 
      this.msg.showToast('Error, failed to delete request');
    });
  }
  showDetails(r : Request){
    this.navCtrl.push('RequestDetailsPage',{request : r});
  }
  
}
