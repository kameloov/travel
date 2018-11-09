import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Country } from '../../models/Country';
import { Api } from '../../providers';

/**
 * Generated class for the CountryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-country-list',
  templateUrl: 'country-list.html',
})
export class CountryListPage {

  public countries: Country[];
  public loading :boolean ;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api : Api,
    public viewCtrl: ViewController) {
    this.getCountries();
  }

  getCountries(){
    this.loading =true;
    this.api.get('countries').subscribe((res: any) => {
      if (res.success == 1) {
        this.countries = res.data;
      } else {
        
      }
      this.loading = false;
    },
    (err)=>{
      console.log(JSON.stringify(err));
    });
  }

  public selectCountry(country : Country){
    this.viewCtrl.dismiss(country);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CountryListPage');
  }

}
