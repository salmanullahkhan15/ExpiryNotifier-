import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ToastController } from 'ionic-angular';
import { Item } from '../../models/item';

@IonicPage()
@Component({
  selector: 'page-custom',
  templateUrl: 'custom.html',
})
export class CustomPage {

  items: Item[];
  lblSelection: string;
  reminderDate: string = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
  isReminder: boolean;
  notificationType: string;
  ids;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private localNotifications: LocalNotifications, public toastCtrl: ToastController) {

    this.items = navParams.get('items');
    this.lblSelection = "";
    if (this.items.length > 1) this.notificationType = "Summary";
    else this.notificationType = "Pop-up";
    if (this.items.length > 1) {
      // multi items
      this.ids = "";
      for (let i = 0; i < this.items.length; i++) {
        this.ids = this.ids + "" + this.items[i].id;
      }
    } else {
      // single item
      this.ids = this.items[0].id;
    }
    console.log(this.ids);
    this.localNotifications.get(this.ids)
      .then(data => {
        if (data.id != null) {
          this.localNotifications.isScheduled(this.ids)
            .then(isAvail => {
              console.log(isAvail);
              if (!isAvail) this.localNotifications.clear(this.ids);
              else {
                let reminderTime = (new Date(new Date(data.trigger.at).getTime() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
                this.isReminder = true;
                this.reminderDate = reminderTime;
                if (data.sound.length > 0) this.notificationType = "Sound";
                else {
                  if (this.items.length == 1) this.notificationType = "Pop-up";
                  else this.notificationType = "Summary";
                }
              }
            });
        }
      });
    for (let i = 0; i < this.items.length; i++) {
      this.lblSelection = this.lblSelection + this.items[i].name;
      if (i == (this.items.length - 2)) {
        this.lblSelection = this.lblSelection + " and ";
      }
      else if (i < (this.items.length - 1)) {
        this.lblSelection = this.lblSelection + ", ";
      }

    }

  }

  btnSave() {
    if (this.isReminder) {
      // user wants to set reminder
      let newTime = new Date((new Date(this.reminderDate)).getTime() + (new Date()).getTimezoneOffset() * 60000)
      newTime.setSeconds(0);
      // setup
      let options, text;
      if (this.items.length > 1) text = 'Hey! Hurry up, Consume Your ' + this.lblSelection;
      else text = 'Hey! Hurry up, Consume Your ' + this.items[0].name;
      console.log("id " + this.ids + "  --  text " + text);
      options = {
        id: this.ids,
        foreground: true,
        title: 'Your Item(s) is near to its Best Date',
        text: text,
        trigger: { at: newTime },
        sound: this.notificationType == 'Sound' ? 'file://assets/sounds/KeyChimes.mp3' : '',
        led: 'on',
        vibrate: true,
        autoClear: true
      };
      //create
      console.log("setting reminder at " + newTime)
      this.localNotifications.schedule(options);
      this.toastCtrl.create({
        message: 'Reminder has been configured successfully',
        duration: 3000,
      }).present();
    } else {
      // user doesnt wants to set reminder
      this.localNotifications.clear(this.ids);

      this.toastCtrl.create({
        message: 'Reminder has been removed',
        duration: 3000,
      }).present();
    }

  }

  btnCancel() {
    this.navCtrl.pop();
  }



}
