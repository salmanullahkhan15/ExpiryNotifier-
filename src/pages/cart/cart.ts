import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { UserProvider } from '../../providers/user/user';
import { Item } from '../../models/item';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  selecteditems = [];
  items: Item[] = [];
  familyName;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public itemsProvider: ItemsProvider, private localNotifications: LocalNotifications,
    private barcodeScanner: BarcodeScanner, private userService: UserProvider,
    public toastCtrl: ToastController, private loadingCtrl: LoadingController) {
    this.familyName = this.userService.getCurrentUser().family;
  }

  ionViewWillEnter() {
    this.itemsProvider.getList(this.familyName).subscribe(itemsList => {
      if (itemsList) {
        this.items = itemsList['items'].filter(item => {
          if (item.isTrash == true) return false;
          else return true;
        });
        console.log(JSON.stringify(this.items));
      }
      else this.items = [];
    });

    this.btnSelect('off');
  }

  customItem(item) {
    this.navCtrl.push('CustomPage', { items: [item] });
  }

  itemSelected(item, index) {
    let i = this.selecteditems.indexOf(item);
    if (i > -1) {
      this.selecteditems.splice(i, 1);
      item.selected = false;
    } else {
      this.selecteditems.push(item);
      item.selected = true;
    }
  }

  toggleSelect(item, type) {
    let index = this.selecteditems.indexOf(item);
    if (type == "off") {
      if (index > -1) this.selecteditems.splice(index, 1);
      item.selected = false;
    } else {
      if (index > -1) {
        // do nothing
      }
      else this.selecteditems.push(item);
      item.selected = true;
    }
  }

  btnSelect(type) {
    if (type == null) type = this.selecteditems.length > 0 ? "off" : "on";
    this.items.forEach(item => {
      this.toggleSelect(item, type);
    });
  }


  btnDelete() {
    this.selecteditems.forEach(item => {
      this.localNotifications.cancel(item.id);
      this.itemsProvider.movetoTrash(item.id, this.familyName);
    });
  }

  btnCustom() {
    if (this.selecteditems.length > 0) this.navCtrl.push('CustomPage', { items: this.selecteditems.slice() });
  }

  btnAdd() {
    // open camera for QRCode
    this.barcodeScanner.scan({
      prompt: 'Scan Item Barcode',
      preferFrontCamera: false,
      resultDisplayDuration: 0,
      formats: 'DATA_MATRIX'
    }).then(barcodeData => {
      if (barcodeData.text) {
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });

        loading.present();

        this.itemsProvider.addItem(JSON.parse(barcodeData.text), this.userService.getCurrentUser().family)
          .then(() => {
            loading.dismiss();
          });

      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

}
