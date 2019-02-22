import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { UserProvider } from '../../providers/user/user';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-family',
  templateUrl: 'family.html',
})
export class FamilyPage {

  users: User[] = [];
  isTrue = true;
  currentUserID;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userService: UserProvider, private barcodeScanner: BarcodeScanner,
    public toastCtrl: ToastController, private loadingCtrl: LoadingController) {
    this.currentUserID = this.userService.getCurrentUser().id;
    if (this.currentUserID + "_family" == this.userService.getCurrentUser().family) {
      this.isTrue = false;
    }
  }

  ionViewWillLoad() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getFamilyMembers().subscribe(users => {
      this.users = users;
    });
  }

  DeleteUser(user) {
    this.userService.DeleteMember(user.id);
  }

  InviteUser() {
    // Open a QRcode
    this.navCtrl.push('FamilyInvitePage', { familyCode: this.userService.getCurrentUser().family });
  }

  JoinFamily() {
    // open camera for QRCode
    this.barcodeScanner.scan({
      prompt: 'Scan Family QRCode To join',
      preferFrontCamera: false,
      resultDisplayDuration: 0
    }).then(barcodeData => {
      if (barcodeData.text) {
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });

        loading.present();

        this.userService.setFamily(barcodeData.text)
          .then(() => {
            this.loadUsers();
            loading.dismiss();
          });
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

}
