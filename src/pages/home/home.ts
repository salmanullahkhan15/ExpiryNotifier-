import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  bgCurrentImage: string;
  bgImages : { img: string }[] = [
        { img: 'assets/imgs/image1.jpg'},
        { img: 'assets/imgs/image2.jpg'},
        { img: 'assets/imgs/image3.jpg'},
        { img: 'assets/imgs/image4.jpg'},
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter(){
    let i = Math.floor(Math.random() * 4);
    this.bgCurrentImage = this.bgImages[i].img;
  }

}
