import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../../models/Message';
import { BehaviorSubject } from 'rxjs';
import { SERVICE_URl } from '..';

/*
  Generated class for the MessageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageProvider {

  private _messages: BehaviorSubject<Message[]>;
  private discussionId: number;

  constructor(public http: HttpClient) {
    this._messages = new BehaviorSubject([]);
  }

  getMessages(discussionId: number): any {
    this.discussionId = discussionId;
    this.http.get(SERVICE_URl + 'messages/' + discussionId + '/0').subscribe(data => {
      if (data)
      this._messages.next(data['data']);
    })
    return this._messages.asObservable();
  }

    
  refresh(){
    this.http.get(SERVICE_URl + 'messages/' + this.discussionId + '/0').subscribe(data => {
      if (data)
      this._messages.next(data['data']);
    })
  }

  addMessage(message : Message){
    return this.http.post(SERVICE_URl+'message',message);
  }

  delete(message : Message){
    return this.http.delete(SERVICE_URl+'message/'+message.id);
  }

  loadMoreMessages() {
    let current = this._messages.value;
    if (current) {
      this.http.get(SERVICE_URl + 'messages/' + this.discussionId + '/' + this.getMinId(current)).subscribe(data => {
        if (data) {
          let merge = current.concat(data['data']);
          this._messages.next(merge);
        }
      })
    }
  }

  private getMinId(discussions: Message[]): number {
    let min = discussions[0].id;
    for (let r of discussions)
      if (r.id < min)
        min = r.id;
    return min;
  }
  


}
