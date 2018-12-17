import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CProvider {
  public URL: string = 'http://myoriental-music.com/shop/service';

  constructor(public http: HttpClient) {
    console.log('Hello CProvider Provider');
  }

}
