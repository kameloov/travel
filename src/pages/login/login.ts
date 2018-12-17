import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';
import { AccountInfo } from '../../models/AccountInfo';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: AccountInfo;
  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,    public user: User,  public toastCtrl: ToastController,
    public translateService: TranslateService) {
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });
    this.account = new AccountInfo();
  }


  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp) => {
      if(resp['success']==1)
      
      this.navCtrl.push(MainPage,{profile:resp['data'][0]});
      else
      this.showError();
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
    this.showError();
    });
  }

  showError(){
    let toast = this.toastCtrl.create({
      message: this.loginErrorString,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
