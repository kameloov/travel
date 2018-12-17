import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountInfo } from '../../models/AccountInfo';
import { Observable } from 'rxjs';
import { Offer } from '../../models/Offer';
import { User } from '../../providers';
import { OfferProvider } from '../../providers/offer/offer';
import { Request } from '../../models/Request';

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
  public user: AccountInfo;
  public offerList$: Observable<Offer[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public u: User, public offerService: OfferProvider) {
      this.user = this.u.getUser();
      this.request = navParams.get('request');
    
  }
  ionViewDidLoad() {
    this.offerList$ = this.offerService.getOffers(this.request.id);
  }

}
