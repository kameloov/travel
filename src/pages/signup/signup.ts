import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController, Platform, ModalController } from 'ionic-angular';

import { User, Api } from '../../providers';
import { MainPage } from '../';
import { AccountInfo } from '../../models/AccountInfo';
import { Country } from '../../models/Country';
import { Camera } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryListPage } from '../country-list/country-list';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  @ViewChild('fileInput') fileInput;
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: AccountInfo;
  countries: Country[];
  // Our translated text strings
  private signupErrorString: string;
  form: FormGroup;
  public country : any;
  public working : boolean ;


  constructor(public navCtrl: NavController, public user: User, public toastCtrl: ToastController,
    api: Api, public camera: Camera,public modalCtrl : ModalController,formBuilder: FormBuilder, 
    platform: Platform) {
    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      address: [''],
      phone: [''],
      password: ['',Validators.required],
      email: ['',Validators.required],
      country: ['',Validators.required]
    });

      api.get('countries').subscribe((res: any) => {
        if (res.success == 1) {
          this.countries = res.data;
        } else {
          
        }
      },
      (err)=>{
        console.log(JSON.stringify(err));
      });
 

    this.account = new AccountInfo();
 
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }


  public showCountries() {
    let addModal = this.modalCtrl.create('CountryListPage');
    addModal.onDidDismiss(country => {
      if (country) {
        this.country = country;
        this.form.patchValue({ 'country': this.country.id });
      }
    })
    addModal.present();
  }
 

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  doSignup() {
    this.working = true;
    // Attempt to login in through our User service
    this.user.signup(this.form.value).subscribe((resp) => {
      this.working = false;
      if (resp['success'] == 1) {
        this.navCtrl.push(MainPage);
        let toast = this.toastCtrl.create({
          message: 'Registerd successfully',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      } else {
        let toast = this.toastCtrl.create({
          message: resp['message'],
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    }, (err) => {
        this.working = false;
      // this.navCtrl.push(MainPage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
