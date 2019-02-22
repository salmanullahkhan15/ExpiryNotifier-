webpackJsonp([6],{

/***/ 588:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomPageModule", function() { return CustomPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__custom__ = __webpack_require__(597);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CustomPageModule = /** @class */ (function () {
    function CustomPageModule() {
    }
    CustomPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__custom__["a" /* CustomPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__custom__["a" /* CustomPage */]),
            ],
        })
    ], CustomPageModule);
    return CustomPageModule;
}());

//# sourceMappingURL=custom.module.js.map

/***/ }),

/***/ 597:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__ = __webpack_require__(331);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CustomPage = /** @class */ (function () {
    function CustomPage(navCtrl, navParams, localNotifications, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.localNotifications = localNotifications;
        this.toastCtrl = toastCtrl;
        this.reminderDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
        this.items = navParams.get('items');
        this.lblSelection = "";
        if (this.items.length > 1)
            this.notificationType = "Summary";
        else
            this.notificationType = "Pop-up";
        if (this.items.length > 1) {
            // multi items
            this.ids = "";
            for (var i = 0; i < this.items.length; i++) {
                this.ids = this.ids + "" + this.items[i].id;
            }
        }
        else {
            // single item
            this.ids = this.items[0].id;
        }
        console.log("salman");
        console.log(this.ids);
        this.localNotifications.get(this.ids)
            .then(function (data) {
            console.log(data);
            // if (data.id != null) {
            _this.localNotifications.isScheduled(_this.ids)
                .then(function (isAvail) {
                console.log(isAvail);
                if (!isAvail)
                    _this.localNotifications.clear(_this.ids);
                else {
                    var reminderTime = (new Date(new Date(data.trigger.at).getTime() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
                    _this.isReminder = true;
                    _this.reminderDate = reminderTime;
                    if (data.sound.length > 0)
                        _this.notificationType = "Sound";
                    else {
                        if (_this.items.length == 1)
                            _this.notificationType = "Pop-up";
                        else
                            _this.notificationType = "Summary";
                    }
                }
            });
            // }
        });
        for (var i = 0; i < this.items.length; i++) {
            this.lblSelection = this.lblSelection + this.items[i].name;
            if (i == (this.items.length - 2)) {
                this.lblSelection = this.lblSelection + " and ";
            }
            else if (i < (this.items.length - 1)) {
                this.lblSelection = this.lblSelection + ", ";
            }
        }
    }
    CustomPage.prototype.btnSave = function () {
        console.log("salman");
        console.log(this.ids);
        if (this.isReminder) {
            // user wants to set reminder
            var newTime = new Date((new Date(this.reminderDate)).getTime() + (new Date()).getTimezoneOffset() * 60000);
            newTime.setSeconds(0);
            // setup
            var options = void 0, text = void 0;
            if (this.items.length > 1)
                text = 'Hey! Hurry up, Consume Your ' + this.lblSelection;
            else
                text = 'Hey! Hurry up, Consume Your ' + this.items[0].name;
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
            console.log("setting reminder at " + newTime);
            this.localNotifications.schedule(options);
            this.toastCtrl.create({
                message: 'Reminder has been configured successfully',
                duration: 3000,
            }).present();
        }
        else {
            // user doesnt wants to set reminder
            this.localNotifications.clear(this.ids);
            this.toastCtrl.create({
                message: 'Reminder has been removed',
                duration: 3000,
            }).present();
        }
    };
    CustomPage.prototype.btnCancel = function () {
        this.navCtrl.pop();
    };
    CustomPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-custom',template:/*ion-inline-start:"/Users/texpotppl/Desktop/Personal/Projects/Facebook/Benish/BarcodeProject/src/pages/custom/custom.html"*/'<ion-header>\n    <ion-navbar color="dark">\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      <ion-title>Customize</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n<ion-content padding>\n  <h5 ion-text color="dark" > Your Selection {{ lblSelection }} </h5>\n  <ion-item>\n    <ion-label>Reminder</ion-label>\n    <ion-toggle checked="false" color="dark" [(ngModel)]="isReminder"></ion-toggle>\n  </ion-item>\n  <ion-item>\n    <ion-label color="dark">Reminder Date</ion-label>\n    <ion-datetime displayFormat="MMM DD, YYYY HH:mm" placeholder="Tap Here" [(disabled)]="!isReminder" [(ngModel)]="reminderDate"></ion-datetime>\n  </ion-item>\n  <ion-item>\n    <ion-label color="dark">Notification Type</ion-label>\n    <ion-select [(ngModel)]="notificationType" [(disabled)]="!isReminder">\n      <ion-option value="Pop-up" *ngIf="items.length == 1">Pop-up</ion-option>\n      <ion-option value="Sound" *ngIf="items.length == 1">Pop-up + Sound</ion-option>\n      <ion-option value="Summary" *ngIf="items.length > 1">Summary</ion-option>\n    </ion-select>\n  </ion-item>\n  <ion-grid>\n    <ion-row stacked>\n          <button ion-button color="dark" outline col-5 offset-1 (click)="btnSave()">Save</button>\n          <button ion-button color="dark" outline col-5 offset-0 (click)="btnCancel()">Back</button>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/texpotppl/Desktop/Personal/Projects/Facebook/Benish/BarcodeProject/src/pages/custom/custom.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], CustomPage);
    return CustomPage;
}());

//# sourceMappingURL=custom.js.map

/***/ })

});
//# sourceMappingURL=6.js.map