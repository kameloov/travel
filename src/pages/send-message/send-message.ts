import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountInfo } from '../../models/AccountInfo';
import { User } from '../../providers';
import { Discussion } from '../../models/Discussion';
import { DiscussionProvider } from '../../providers/discussion/discussion';
import { AlertProvider } from '../../providers/alert/alert';
import { Message } from '../../models/Message';
import { MessageProvider } from '../../providers/message/message';

/**
 * Generated class for the SendMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-message',
  templateUrl: 'send-message.html',
})
export class SendMessagePage {

  public discussion: Discussion;
  public account: AccountInfo;
  public message: Message;
  public loading: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public user: User,
    public discussionService: DiscussionProvider, public msgService: MessageProvider, public msg: AlertProvider) {
    this.discussion = navParams.get('discussion');
    this.message = new Message();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendMessagePage');
  }

  ionViewDidEnter() {
    this.loading = true;
    this.user.getUser().then(data => {
      if (data) {
        this.account = data;
        this.getDiscussion();
      }
    })
  }

  public getDiscussion() {
    this.loading = true;
    this.discussionService.addDiscussion(this.discussion).subscribe(data => {
      if (data) {
        console.log(JSON.stringify(data));
        if (data['success'] == 1) {
          this.discussion = data['data'][0];
        } else
          this.msg.showToast('Error , failed to create conversation');
      } else
        this.msg.showToast('Error , failed to create conversation');
      this.loading = false;
    },
      err => {
        this.loading = false;
      })
  }

  public sendMessage() {
    this.message.discussion_id = this.discussion.id;
    this.message.user_id = this.account.id;
    this.msgService.addMessage(this.message).subscribe(data => {
      if (data && data['success'] == 1) {

      }
    })
  }

}
