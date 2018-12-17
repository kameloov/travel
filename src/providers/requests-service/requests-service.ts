import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ServiceResponse } from '../../models/ServiceResponse';
import { SERVICE_URl } from '..';
import { Request } from '../../models/Request';

/*
  Generated class for the RequestsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestsProvider {

  private _requests: BehaviorSubject<Request[]>;
  private categoryId: number;

  constructor(public http: HttpClient) {
    console.log('Hello RequestsServiceProvider Provider');
    this._requests = new BehaviorSubject([]);
  }

  addRequest(request : Request){
    return this.http.post(SERVICE_URl+'request',request);
  }

  getRequests(categoryId: number): any {
    this.categoryId = categoryId;
    this.http.get(SERVICE_URl + 'request/' + categoryId + '/0').subscribe(data => {
      if (data)
      this._requests.next(data['data']);
    })
    return this._requests.asObservable();
  }

  loadMoreRequests() {
    let current = this._requests.value;
    if (current) {
      this.http.get(SERVICE_URl + 'request/' + this.categoryId + '/' + this.getMinId(current)).subscribe(data => {
        if (data) {
          let merge = current.concat(data['data']);
          this._requests.next(merge);
        }
      })
    }
  }

  private getMinId(requests: Request[]): number {
    let min = requests[0].id;
    for (let r of requests)
      if (r.id < min)
        min = r.id;
    return min;
  }

  getCategories(): Observable<any> {
    return this.http.get(SERVICE_URl + 'category').map(res => {
      let r = new ServiceResponse();
      r.success = res['success'] == 1;
      r.data = r.success ? res['data'] : res['message'];
      return r;
    })
  }


}
