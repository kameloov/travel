import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { AccountInfo } from '../../models/AccountInfo';
import { Storage } from '@ionic/storage';


/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: AccountInfo;

  constructor(public api: Api,public storage: Storage) { 
  
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('users/login', accountInfo).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.success == 1) {
        console.log(JSON.stringify(res));
        accountInfo= res.data[0];
        this.saveUser(accountInfo);
        this._loggedIn(accountInfo);
      } else {

      }
    }, err => {
      console.error(JSON.stringify(err));
    });

    return seq;
  }

  public getUserById(id : number){
    return this.api.get('users/'+id);
  }


  saveUser(user : AccountInfo){
    console.log("saving user ",JSON.stringify(user));
    this.storage.set('USER_INFO',user);
  }

  getUser():any{
     return this.storage.get('USER_INFO').then(data=>{
       console.log("getting user",JSON.stringify(data));
      return data;
    }) 
 /*    let u = new AccountInfo();
    u.id = 4;
    u.email = "kameloov@gmail.com";
    u.name = " kamel";
    u.phone = "48648956445";
    u.address = "khartoum"
    return u ; */
  }
  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */

  signup(accountInfo: any) {
    let seq = this.api.post('users/register', accountInfo).share();
    seq.subscribe((res: any) => {
      console.log(JSON.stringify(res));
      // If the API returned a successful response, mark the user as logged in
      if (res.success == 1) {
        accountInfo = res.data[0];
        this.saveUser(accountInfo);
        this._user = accountInfo;
      }
    }, err => {
      console.error(JSON.stringify(err));
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp;
  }
}
