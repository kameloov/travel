import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController, Platform, ModalController, Slides } from 'ionic-angular';

import { User, Api } from '../../providers';
import { MainPage } from '../';
import { AccountInfo } from '../../models/AccountInfo';
import { Country } from '../../models/Country';
import { Camera } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertProvider } from '../../providers/alert/alert';
import { RequestListPage } from '../request-list/request-list';

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
  public country: any;
  public working: boolean;
  public position: number = 0;
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public user: User, public toastCtrl: ToastController,
    api: Api, public camera: Camera, public modalCtrl: ModalController, formBuilder: FormBuilder,
    platform: Platform, public alert: AlertProvider) {
    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      address: [''],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      country: ['', Validators.required]
    });


    api.get('countries').subscribe((res: any) => {
      if (res.success == 1) {
        this.countries = res.data;
        console.log(JSON.stringify(this.countries));
      } else {

      }
    },
      (err) => {
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

  public selectCountry(c: Country) {
    this.country = c;
    this.form.patchValue({ 'country': c.id });
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  getTitle() {
    if (!this.slides)
      return "Next";
    return this.slides.isEnd() ? "Register" : "Next";
  }

  validateData() {
    if (!this.form.valid) {
      this.alert.showToast('Please fill empty fields');
    }
    console.log("form value :  ",this.form.value);
    console.log("form valid :  ",this.form.valid);
    return this.form.valid;
  }

  signUp() {

    // Attempt to login in through our User service
    if (!this.validateData())
      return;
    this.working = true;
    this.user.signup(this.form.value).subscribe((resp) => {
      this.working = false;
      if (!resp) {
        this.alert.showToast('Error , Registration failed');
      }
      if (resp['success'] == 1) {
        this.alert.showToast('Registerd successfully');
        this.navCtrl.setRoot('RequestListPage');
      } else {
        this.alert.showToast(resp['message']);
      }
    }, (err) => {
      this.working = false;
      // this.navCtrl.push(MainPage);
      this.alert.showToast(this.signupErrorString);
    });
  }
  doSignup() {
  
    if (!this.slides.isEnd())
      this.slides.slideNext();
    else
      this.signUp();
  }
}
