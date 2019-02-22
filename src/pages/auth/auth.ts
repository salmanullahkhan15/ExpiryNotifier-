import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, LoadingController  } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserProvider } from '../../providers/user/user';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
  
  @ViewChild(Slides) slides: Slides;
  heading: string = "ICA Shopping";
  user = {} as User;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private afAuth: AngularFireAuth, private afs: AngularFirestore,
    private loadingCtrl: LoadingController, private userService: UserProvider, 
    public toastCtrl: ToastController) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }

  toMainSlide(){
    this.heading = "ICA Shopping";
    this.slides.slideTo(0);
  }

  toRegister(){
    this.heading = "Registration Page";
    this.slides.slideTo(1);
  }

  RegisterUser(user: User){
    try {
      
      if(user.name && user.password && user.email){
        let loading = this.loadingCtrl.create({
          content: 'Please wait...',
          dismissOnPageChange: true
        });
  
        loading.present();
    
        this.afAuth.auth.createUserWithEmailAndPassword(user.email.trim(), user.password.trim())
        .then(res => {
          if(res && res.user.uid && res.user.email){
            this.afs.collection<User>('Users').doc(res.user.uid).set({
              name: user.name,
              gender: user.gender != null?user.gender:null,
              address: user.address != null?user.address:null,
              family: res.user.uid+"_family"
            }).then(() => {
              this.afs.collection('Items').doc(res.user.uid+"_family").set({
                items: []
              }).then(() => {
                user.id = res.user.uid;
                user.family = res.user.uid+"_family";
                this.userService.setCurrentUser(user);
                console.log(JSON.stringify(user));
                this.navCtrl.setRoot('HomePage');
              });
            });
          }
        })
        .catch(e => {
          loading.dismiss();
          this.toastCtrl.create({
            message: 'Error: '+e.message,
            duration: 3000,
          }).present();
        });
      }else{
        this.toastCtrl.create({
          message: 'Please Fill Required Inputs',
          duration: 3000,
        }).present();
      }
      
      //loading.dismiss();
    } catch (e) {
      alert('Error: '+e.message);
    }
  }

  toLogin(){
    this.heading = "Login Page";
    this.slides.slideTo(2);
  }

  LoginUser(user: User){
    try {
      if(user.email && user.password){
        let loading = this.loadingCtrl.create({
          content: 'Please wait...',
          dismissOnPageChange: true
        });
    
        loading.present(); 
  
        this.afAuth.auth.signInWithEmailAndPassword(user.email.trim(), user.password.trim())
        .then(res => {
          if(res && res.user.uid && res.user.email){
            
            let sub = this.afs.doc<User>('Users/'+res.user.uid).valueChanges()
            .subscribe( user => {
              console.log('User Found during Auth: '+user.name)
              user.id = res.user.uid;
              this.userService.setCurrentUser(user);
              sub.unsubscribe();
              this.navCtrl.setRoot('HomePage');
            })
          }
        })
        .catch(e => {
          loading.dismiss();
          this.toastCtrl.create({
            message: 'Error: '+e.message,
            duration: 3000,
          }).present();
        });
        //loading.dismiss();
      }else{
        this.toastCtrl.create({
          message: 'Please Fill Required Inputs',
          duration: 3000,
        }).present();
      }
    } catch (e) {
      alert("Error: "+e.message);
    }
  }


}
