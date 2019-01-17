import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Category } from '../../models/Category';
import { RequestsProvider } from '../../providers/requests-service/requests-service';
import { Observable } from 'rxjs';

/**
 * Generated class for the CategoryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {

  public categories$:Observable< Category[]>;
  public loading :boolean ;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,private requestService : RequestsProvider ) {
    this.getCategories();
  }

  getCategories(){
    this.categories$ = this.requestService.getCategories();
  }

  public selectCategory(category : Category){
    this.viewCtrl.dismiss(category);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CountryListPage');
  }


}
