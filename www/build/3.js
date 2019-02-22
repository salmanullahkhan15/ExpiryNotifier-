webpackJsonp([3],{

/***/ 590:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FamilyPageModule", function() { return FamilyPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__family__ = __webpack_require__(599);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FamilyPageModule = /** @class */ (function () {
    function FamilyPageModule() {
    }
    FamilyPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__family__["a" /* FamilyPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__family__["a" /* FamilyPage */]),
            ],
        })
    ], FamilyPageModule);
    return FamilyPageModule;
}());

//# sourceMappingURL=family.module.js.map

/***/ }),

/***/ 599:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FamilyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_user__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_barcode_scanner__ = __webpack_require__(332);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FamilyPage = /** @class */ (function () {
    function FamilyPage(navCtrl, navParams, userService, barcodeScanner, toastCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
        this.barcodeScanner = barcodeScanner;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.users = [];
        this.isTrue = true;
        this.currentUserID = this.userService.getCurrentUser().id;
        if (this.currentUserID + "_family" == this.userService.getCurrentUser().family) {
            this.isTrue = false;
        }
    }
    FamilyPage.prototype.ionViewWillLoad = function () {
        this.loadUsers();
    };
    FamilyPage.prototype.loadUsers = function () {
        var _this = this;
        this.userService.getFamilyMembers().subscribe(function (users) {
            _this.users = users;
        });
    };
    FamilyPage.prototype.DeleteUser = function (user) {
        this.userService.DeleteMember(user.id);
    };
    FamilyPage.prototype.InviteUser = function () {
        // Open a QRcode
        this.navCtrl.push('FamilyInvitePage', { familyCode: this.userService.getCurrentUser().family });
    };
    FamilyPage.prototype.JoinFamily = function () {
        var _this = this;
        // open camera for QRCode
        this.barcodeScanner.scan({
            prompt: 'Scan Family QRCode To join',
            preferFrontCamera: false,
            resultDisplayDuration: 0
        }).then(function (barcodeData) {
            if (barcodeData.text) {
                var loading_1 = _this.loadingCtrl.create({
                    content: 'Please wait...'
                });
                loading_1.present();
                _this.userService.setFamily(barcodeData.text)
                    .then(function () {
                    _this.loadUsers();
                    loading_1.dismiss();
                });
            }
        }).catch(function (err) {
            console.log('Error', err);
        });
    };
    FamilyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-family',template:/*ion-inline-start:"/Users/texpotppl/Desktop/Personal/Projects/Facebook/Benish/BarcodeProject/src/pages/family/family.html"*/'<ion-header>\n  <ion-navbar color="dark">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Family</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h4 ion-text color="dark"> Your Family</h4>\n  \n  <ion-list>\n    <ion-item-sliding *ngFor="let user of users">\n      <ion-item [ngClass]="{selected: user.selected, item: !user.selected}">\n        <ion-label col>{{ user.name }}</ion-label>\n      </ion-item>\n      <ion-item-options side="right" *ngIf="isTrue != true" >\n        <span *ngIf="user.id != currentUserID" >\n          <button ion-button color="dark" (click)="DeleteUser(user)">\n            Delete\n          </button>\n        </span>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n  <ion-item stacked>\n    <button ion-button color="dark" outline col-4 (click)="InviteUser()">Invite User</button>\n    <button ion-button color="dark" outline col-6 (click)="JoinFamily()">Join Another Family</button>\n  </ion-item>\n</ion-content>\n'/*ion-inline-end:"/Users/texpotppl/Desktop/Personal/Projects/Facebook/Benish/BarcodeProject/src/pages/family/family.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], FamilyPage);
    return FamilyPage;
}());

//# sourceMappingURL=family.js.map

/***/ })

});
//# sourceMappingURL=3.js.map