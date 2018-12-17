import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { User, Api } from '../../providers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {

  
  @ViewChild('fileInput') fileInput;
  public updating : boolean;
  public profile: any;
  public edit: boolean;
  public country : any;
  form: FormGroup;

  constructor(public navCtrl: NavController, navParams: NavParams, user: User, public api: Api,
    public toastCtrl: ToastController,public modalCtrl : ModalController,
    public formBuilder : FormBuilder, public camera : Camera) {
    this.profile = navParams.get('profile');
    this.form = formBuilder.group({
      profilePic: [''],
        email: ['',Validators.required]
    });

  }

  public refreshUser(){
    this.api.get('users/'+this.profile.email).subscribe(data=>{
      if (data['success']==1){
        this.profile=data['data'][0];
        
      }
      this.updating = false;
      this.form.reset();
    }, 
    err=>{
      this.updating = false;
      this.form.reset();
    })
  }

  public changePicture(){
    this.updating = true;
    this.api.post('update/avatar',this.form.value).subscribe(data=>{
      if (data['success']==1){
        this.showMessage('profile picture updated successfully');
        this.refreshUser();
      } else {
        this.showMessage('Error updating profile picture');
      }
      
    },
    err=>{
      this.showMessage('Error updating profile picture');
      this.updating = true;
    })

  }

  public getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
        this.form.patchValue({'email':this.profile.email});
        this.changePicture();
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  public processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
      this.form.patchValue({'email':this.profile.email});
      this.changePicture();
    };

    reader.readAsDataURL(event.target.files[0]);
  }


  public editProfile() {
    this.api.post('update/user', this.profile).subscribe(res => {
      if (res['success'] == 1) {
        this.showMessage('profile data updated successfully');
        this.edit = false;
      } else
        this.showMessage('error pdating profile ');
    })
  }
  public toggleEdit() {
    if (this.edit) { 
    this.editProfile();
  } else
    this.edit = true;
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  public showCountries() {
    let addModal = this.modalCtrl.create('CountryListPage');
    addModal.onDidDismiss(country => {
      if (country) {
        this.country = country;
        this.profile.country_id=country.id;
        this.profile.country_name = country.country_name;
      }
    })
    addModal.present();
  }

showMessage(msg : string){
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

}
