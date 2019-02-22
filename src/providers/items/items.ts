import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from '../../models/item';
import { map } from 'rxjs/operators';

@Injectable()
export class ItemsProvider {

  private items : Item[] = [];

  constructor(private afs: AngularFirestore) {
    
  }

  generateUniqueID(){
    return new Promise((res) => {
      let id;
      while(true){
        id = Math.floor(Math.random() * Math.floor(1000));
        console.log('new key '+id);
        if(this.items.length > 0){
          if(this.items.find( o => o.id != id)){
            console.log(id+' is an unique key');
            break;
          }
        }else break;
      }
      res(id);
    });
  }

  addItem(item, familyName){
    return new Promise((res) => {
      let doc = this.afs.doc('Items/'+familyName);
      let sub = doc.valueChanges().subscribe( itemsList => {
        this.items = itemsList['items'];
        if(!this.items) this.items = [];
        this.generateUniqueID().then( id => {
          item.id = id;
          item.isTrash = false;
          this.items.push(item);
          sub.unsubscribe();
          doc.update({items:this.items})
          .then(() => {
            res();
          });
        });
      });
    });
  }

  getList(familyName){
    return this.afs.doc('Items/'+familyName).valueChanges();
  }


  movetoTrash(id, familyName){
    let doc = this.afs.doc('Items/'+familyName);
    let sub = doc.valueChanges().subscribe( itemsList => {
      this.items = itemsList['items'];
      let item = this.items.find( o => o.id == id);
      item.isTrash = true;
      sub.unsubscribe();
      doc.update({items:this.items});
    });
  }

  movetoCart(id, familyName){
    let doc = this.afs.doc('Items/'+familyName);
    let sub = doc.valueChanges().subscribe( itemsList => {
      this.items = itemsList['items'];
      let item = this.items.find( o => o.id == id);
      item.isTrash = false;
      sub.unsubscribe();
      doc.update({items:this.items});
    });
  }

  deleteItem(id, familyName){
    let doc = this.afs.doc('Items/'+familyName);
    let sub = doc.valueChanges().subscribe( itemsList => {
      this.items = itemsList['items'].filter( item => {
        if(item.id == id) return false;
        else return true;
      });
      sub.unsubscribe();
      doc.update({items:this.items});
    });
  }
}
