import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SERVICE_URl, User } from '../../providers';
import { AccountInfo } from '../../models/AccountInfo';
import { AlertProvider } from '../../providers/alert/alert';

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  public id : number ;
  public url : String ;
  public account : AccountInfo;

  constructor(public navCtrl: NavController, public navParams: NavParams, private user : User,
     public alert : AlertProvider) {
    this.id = navParams.get('id');
    this.url = SERVICE_URl+'icons/';
  }

  ionViewDidLoad() {
    
  }

  ionViewDidEnter(){
    this.loadUser();
  }

  public loadUser(){
    this.user.getUserById(this.id).subscribe(data=>{
      if (data){
        if (data['success']==1){
            this.account = data['data'];
        } else 
          this.alert.showToast('Error , unable to load user data !!')
        
      } else 
    }, 
    err=>{

    })
  }

}
