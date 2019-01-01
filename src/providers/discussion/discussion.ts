import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Discussion } from '../../models/Discussion';
import { BehaviorSubject } from 'rxjs';
import { SERVICE_URl } from '..';

/*
  Generated class for the DiscussionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DiscussionProvider {

  private _discussions: BehaviorSubject<Discussion[]>;
  private userId: number;

  constructor(public http: HttpClient) {
    this._discussions = new BehaviorSubject([]);
  }

  getDiscussions(userId: number): any {
    this.userId = userId;
    this.http.get(SERVICE_URl + 'discussions/' + userId + '/0').subscribe(data => {
      if (data)
      this._discussions.next(data['data']);
    })
    return this._discussions.asObservable();
  }

    
  refresh(){
    this.http.get(SERVICE_URl + 'discussions/' + this.userId + '/0').subscribe(data => {
      if (data)
      this._discussions.next(data['data']);
    })
  }

  addDiscussion(discussion : Discussion){
    return this.http.post(SERVICE_URl+'discussion',discussion);
  }

  delete(discussion : Discussion){
    return this.http.delete(SERVICE_URl+'discussion/'+discussion.id);
  }

  loadMoreDiscussions() {
    let current = this._discussions.value;
    if (current) {
      this.http.get(SERVICE_URl + 'discussions/' + this.userId + '/' + this.getMinId(current)).subscribe(data => {
        if (data) {
          let merge = current.concat(data['data']);
          this._discussions.next(merge);
        }
      })
    }
  }

  private getMinId(discussions: Discussion[]): number {
    let min = discussions[0].id;
    for (let r of discussions)
      if (r.id < min)
        min = r.id;
    return min;
  }
  

}
