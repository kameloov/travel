import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SERVICE_URl } from '..';
import { Offer } from '../../models/Offer';

/*
  Generated class for the OfferProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OfferProvider {
  private _offers: BehaviorSubject<Offer[]>;
  private requestId: number;

  constructor(public http: HttpClient) {
    console.log('Hello RequestsServiceProvider Provider');
    this._offers = new BehaviorSubject([]);
  }

/*   addRequest(request : Request){
    return this.http.post(SERVICE_URl+'request',request);
  }
 */
  getOffers(requestId: number): any {
    this.requestId = requestId;
    this.http.get(SERVICE_URl + 'offers/' + requestId + '/0').subscribe(data => {
      if (data)
      this._offers.next(data['data']);
    })
    return this._offers.asObservable();
  }
  
  refresh(){
    this.http.get(SERVICE_URl + 'offers/' + this.requestId + '/0').subscribe(data => {
      if (data)
      this._offers.next(data['data']);
    })
  }

  addOffer(offer : Offer){
    return this.http.post(SERVICE_URl+'offer',offer);
  }

  delete(offer : Offer){
    return this.http.delete(SERVICE_URl+'offer/'+offer.id);
  }

  loadMoreOffers() {
    let current = this._offers.value;
    if (current) {
      this.http.get(SERVICE_URl + 'offers/' + this.requestId + '/' + this.getMinId(current)).subscribe(data => {
        if (data) {
          let merge = current.concat(data['data']);
          this._offers.next(merge);
        }
      })
    }
  }

  private getMinId(requests: Offer[]): number {
    let min = requests[0].id;
    for (let r of requests)
      if (r.id < min)
        min = r.id;
    return min;
  }


}
