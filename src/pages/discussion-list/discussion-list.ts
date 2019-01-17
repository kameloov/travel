import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Discussion } from '../../models/Discussion';
import { DiscussionProvider } from '../../providers/discussion/discussion';
import { User } from '../../providers';
import { AccountInfo } from '../../models/AccountInfo';

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

  public discussionList$: Observable<Discussion[]>;
  public account: AccountInfo;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private discussionService: DiscussionProvider, public user: User) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscussionListPage');
  }


  ionViewDidEnter() {
    this.user.getUser().then(data => {
      if (data) {
        this.account = data;
        this.discussionList$ = this.discussionService.getDiscussions(this.account.id);
      }
    })
  }

}
