import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Select, PopoverController } from 'ionic-angular';
import { ListMasterPage } from '../list-master/list-master';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  @ViewChild (Select) select :Select;

  constructor(public navCtrl: NavController,public popvover :PopoverController) { }

  login(ev) {
//    this.select.open(ev);
    this.navCtrl.push('LoginPage');
  }

  public predict(event){
    this.select.open(event);
      /* let popover = this.popvover.create(ListMasterPage);
    popover.present({
      ev: event
    });
    popover.present; */
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}

