import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Discussion } from '../../models/Discussion';
import { DiscussionProvider } from '../../providers/discussion/discussion';

/**
 * Generated class for the DiscussionListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-discussion-list',
  templateUrl: 'discussion-list.html',
})

export class DiscussionListPage {

  public discussionList$ : Observable<Discussion[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private discussionSerice : DiscussionProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscussionListPage');
  }

  ionViewDidEnter(){
    
  }

}
