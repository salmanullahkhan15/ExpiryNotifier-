import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-trash',
  templateUrl: 'trash.html',
})
export class TrashPage {

  selecteditems = [];
  items : {name: string, type: string, expiry:string}[] = [];
  familyName;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public itemsProvider: ItemsProvider, private userService: UserProvider) {
    this.familyName = this.userService.getCurrentUser().family;
  }

  ionViewWillEnter(){
    this.itemsProvider.getList(this.familyName).subscribe( itemsList => {
      this.items = itemsList['items'].filter( item => {
        if(item.isTrash == true) return true;
        else return false;
      });
    });

    this.btnSelect('off');
  }

  RecoverItem(item){
    this.itemsProvider.movetoCart(item,this.familyName);
  }

  itemSelected( item ){
    let index = this.selecteditems.indexOf(item);
    if(index > -1) {
        this.selecteditems.splice(index, 1);
        item.selected = false;
    } else {
        this.selecteditems.push(item);
        item.selected = true;
    }
  }

  toggleSelect( item, type ){
    let index = this.selecteditems.indexOf(item);
    if(type == "off"){
      if(index > -1) this.selecteditems.splice(index, 1);
      item.selected = false;
    }else{
      if(index > -1) {
          // do nothing
      } 
      else this.selecteditems.push(item);
      item.selected = true;
    }
  }

  btnSelect(type){
    if(type == null) type = this.selecteditems.length > 0?"off":"on"; 
    this.items.forEach(item => {
      this.toggleSelect( item, type );
    });
  }


  btnDelete(){
    this.selecteditems.forEach(item => {
      this.itemsProvider.deleteItem(item.id, this.familyName);
    });
  }

  btnRecover(){
    this.selecteditems.forEach(item => {
      this.itemsProvider.movetoCart(item.id, this.familyName);
    });
  }

}
