import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountInfo } from '../../models/AccountInfo';
import { Observable } from 'rxjs';
import { Offer } from '../../models/Offer';
import { User, SERVICE_URl } from '../../providers';
import { OfferProvider } from '../../providers/offer/offer';
import { Request } from '../../models/Request';
import { AlertProvider } from '../../providers/alert/alert';

/**
 * Generated class for the RequestDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-request-details',
  templateUrl: 'request-details.html',
})
export class RequestDetailsPage {
  public request: Request;
  public user: AccountInfo = new AccountInfo();
  public offerList$: Observable<Offer[]>;
  public img_url = SERVICE_URl+"icons/";
  public offer : Offer;
  public adding : boolean = false;
  public loading : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public msg : AlertProvider,
    public u: User, public offerService: OfferProvider) {
        this.offer = new Offer();
      this.request = navParams.get('request');
      this.u.getUser().then(data=>{
        this.user = data;
      })
  }

  add() {
    this.loading = true;
    this.offer.request_id = this.request.id;
    this.offer.user_id = this.user.id;
    this.offerService.addOffer(this.offer).subscribe(data => {
      if (data) {
        this.loading = false;
        if (data['success'] == 1){
          this.msg.showToast('Added successfully');
          this.offerService.refresh();
          this.adding = false;
         } else
          this.msg.showToast(data['message']);
      } else
        this.msg.showToast('Error , failed to add offer');
    }, err => {
      this.loading = false;
      this.msg.showToast('Error , failed to add offer');
    });
  }

  delete(o : Offer){
    this.offerService.delete(o).subscribe(data=>{
      if (data && data['success']==1){
          this.offerService.refresh();
      } else 
      this.msg.showToast('Error , failed to delete ');
    })
  }

  ionViewDidLoad() {
   
  }
  ionViewDidEnter(){
    this.u.getUser().then(data=>{
      this.user = data;
      console.log("user",JSON.stringify(data));
      console.log("request",JSON.stringify(this.request));
    });
    this.offerList$ = this.offerService.getOffers(this.request.id);
  }
}
