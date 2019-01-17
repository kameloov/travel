import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, ModalController } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests-service/requests-service';
import { Request } from '../../models/Request';
import { AlertProvider } from '../../providers/alert/alert';
import { Observable } from 'rxjs';
import { User } from '../../providers';
import { Country } from '../../models/Country';
import { Category } from '../../models/Category';

/**
 * Generated class for the AddRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-request',
  templateUrl: 'add-request.html',
})
export class AddRequestPage {
  public request: Request;
  public country :Country;
  public category : Category;
  public loading: boolean;
  public categoryList$ : Observable<Request[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public user : User,
    public requestService: RequestsProvider, private msg: AlertProvider, public modalCtrl : ModalController) {
      this.request = new Request();
      this.categoryList$ = requestService.getCategories();
      
  }
  public getCategoryCaption(){
    return this.category ? this.category.name : 'Select Category';
  }
  
  public getCountryCaption(){
    return this.country ? this.country.country_name : 'Select Country';
  }
  
 public cancel(){
  this.navCtrl.setRoot('RequestListPage');
 }
  public add() {
    this.loading = true;
    this.requestService.addRequest(this.request).subscribe(data => {
      if (data) {
        this.loading = false;
        if (data['success'] == 1){
          this.msg.showToast('Added successfully');
          this.navCtrl.setRoot('RequestListPage');
      }else
          this.msg.showToast(data['message']);
      } else
        this.msg.showToast('Error , failed to add request');
    }, err => {
      this.loading = false;
      this.msg.showToast('Error , failed to add request');
    });
  }
  
  public selectCountry() {
    let countryModal = this.modalCtrl.create('CountryListPage');
    countryModal.onDidDismiss(country => {
      if (country) {
        this.country = country;
        this.request.country_id = country.id;
      }
    })
    countryModal.present();
  }

  public selectCategory() {
    let categoryModal = this.modalCtrl.create('CategoryListPage');
    categoryModal.onDidDismiss(category => {
      if (category) {
        this.category = category;
        this.request.category_id = category.id;
      }
    })
    categoryModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRequestPage');
  }
  ionViewDidEnter(){
    this.user.getUser().then(data=> this.request.user_id = data['id']);
  }

}
