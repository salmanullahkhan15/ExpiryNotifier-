import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../models/user';
import { map } from 'rxjs/operators';


@Injectable()
export class UserProvider {

  private currentUser: User;

  constructor(private afs: AngularFirestore) {
  }

  setCurrentUser(user){
    this.currentUser = user;
  }
  
  getCurrentUser(){
    console.log('Returning Current User => '+this.currentUser);
    return this.currentUser;
  }

  getFamilyMembers(){
    console.log('Finding members of '+this.currentUser.family)
    return this.afs.collection<User>('Users', 
      ref => ref.where('family','==',this.currentUser.family)
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        let data = a.payload.doc.data() as User;
        data.id = a.payload.doc.id;
        return data;
      }))
    )
  }

  
  DeleteMember(id){
    return new Promise((res,rej) => {
      this.afs.collection<User>('Users').doc(id).update({
        family: id+"_family"
      }).then(() => {
        res()
      })
      .catch(e => rej(e));
    });
  }

  setFamily(newFamily){
    return new Promise((res,rej) => {
      this.afs.collection<User>('Users').doc(this.currentUser.id).update({
        family: newFamily
      }).then(() => {
        this.currentUser.family = newFamily;
        res()
      })
      .catch(e => rej(e));
    });
  }
}
