import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-family-invite',
  templateUrl: 'family-invite.html',
})
export class FamilyInvitePage {

  familyCode = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.familyCode = this.navParams.get('familyCode');
  }

  ionViewDidLoad() {
    //
  }

}
