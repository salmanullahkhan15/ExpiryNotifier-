import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user';
import { UserProvider } from '../providers/user/user';
import { ItemsProvider } from '../providers/items/items';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = '';

  pages: Array<{icon: string, title: string, component: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
    private afAuth: AngularFireAuth, private afs: AngularFirestore, private userService: UserProvider,
    private itemService: ItemsProvider) {
    let auth = this.afAuth.authState.subscribe(data => {
      if(data && data.uid && data.email){
        if(userService.getCurrentUser() == null){
          let sub = this.afs.doc<User>('Users/'+data.uid).valueChanges()
          .subscribe( user => {
            console.log('User Found during Check-Auth: '+user.name)
            user.id = data.uid;
            this.userService.setCurrentUser(user);
            sub.unsubscribe();
            auth.unsubscribe();
            this.rootPage = 'HomePage';
          })
        }
      }
      else {
        auth.unsubscribe();
        this.rootPage = 'AuthPage';
      }
    });

    this.initializeApp();
    
    // used for an example of ngFor and navigation
    this.pages = [
      { icon: 'home', title: 'Home', component: 'HomePage' },
      { icon: 'cart', title: 'Your Cart', component: 'CartPage' },
      { icon: 'trash', title: 'Trash', component: 'TrashPage' },
      { icon: 'people', title: 'Family Tree', component: 'FamilyPage' },
      { icon: 'settings', title: 'Settings', component: 'SettingPage' },
      { icon: 'person', title: 'Logout', component: 'Logout' },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title != "Logout") this.nav.setRoot(page.component);
    else{
      this.afAuth.auth.signOut().then(() => {
        this.nav.setRoot('AuthPage');
      });
    }
  }
}
