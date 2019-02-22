webpackJsonp([8],{

/***/ 586:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthPageModule", function() { return AuthPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth__ = __webpack_require__(595);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AuthPageModule = /** @class */ (function () {
    function AuthPageModule() {
    }
    AuthPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__auth__["a" /* AuthPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__auth__["a" /* AuthPage */]),
            ],
        })
    ], AuthPageModule);
    return AuthPageModule;
}());

//# sourceMappingURL=auth.module.js.map

/***/ }),

/***/ 595:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_auth__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_firestore__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_user__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AuthPage = /** @class */ (function () {
    function AuthPage(navCtrl, navParams, afAuth, afs, loadingCtrl, userService, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.afs = afs;
        this.loadingCtrl = loadingCtrl;
        this.userService = userService;
        this.toastCtrl = toastCtrl;
        this.heading = "ICA Shopping";
        this.user = {};
    }
    AuthPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AuthPage');
    };
    AuthPage.prototype.toMainSlide = function () {
        this.heading = "ICA Shopping";
        this.slides.slideTo(0);
    };
    AuthPage.prototype.toRegister = function () {
        this.heading = "Registration Page";
        this.slides.slideTo(1);
    };
    AuthPage.prototype.RegisterUser = function (user) {
        var _this = this;
        try {
            if (user.name && user.password && user.email) {
                var loading_1 = this.loadingCtrl.create({
                    content: 'Please wait...',
                    dismissOnPageChange: true
                });
                loading_1.present();
                this.afAuth.auth.createUserWithEmailAndPassword(user.email.trim(), user.password.trim())
                    .then(function (res) {
                    if (res && res.user.uid && res.user.email) {
                        _this.afs.collection('Users').doc(res.user.uid).set({
                            name: user.name,
                            gender: user.gender != null ? user.gender : null,
                            address: user.address != null ? user.address : null,
                            family: res.user.uid + "_family"
                        }).then(function () {
                            _this.afs.collection('Items').doc(res.user.uid + "_family").set({
                                items: []
                            }).then(function () {
                                user.id = res.user.uid;
                                user.family = res.user.uid + "_family";
                                _this.userService.setCurrentUser(user);
                                console.log(JSON.stringify(user));
                                _this.navCtrl.setRoot('HomePage');
                            });
                        });
                    }
                })
                    .catch(function (e) {
                    loading_1.dismiss();
                    _this.toastCtrl.create({
                        message: 'Error: ' + e.message,
                        duration: 3000,
                    }).present();
                });
            }
            else {
                this.toastCtrl.create({
                    message: 'Please Fill Required Inputs',
                    duration: 3000,
                }).present();
            }
            //loading.dismiss();
        }
        catch (e) {
            alert('Error: ' + e.message);
        }
    };
    AuthPage.prototype.toLogin = function () {
        this.heading = "Login Page";
        this.slides.slideTo(2);
    };
    AuthPage.prototype.LoginUser = function (user) {
        var _this = this;
        try {
            if (user.email && user.password) {
                var loading_2 = this.loadingCtrl.create({
                    content: 'Please wait...',
                    dismissOnPageChange: true
                });
                loading_2.present();
                this.afAuth.auth.signInWithEmailAndPassword(user.email.trim(), user.password.trim())
                    .then(function (res) {
                    if (res && res.user.uid && res.user.email) {
                        var sub_1 = _this.afs.doc('Users/' + res.user.uid).valueChanges()
                            .subscribe(function (user) {
                            console.log('User Found during Auth: ' + user.name);
                            user.id = res.user.uid;
                            _this.userService.setCurrentUser(user);
                            sub_1.unsubscribe();
                            _this.navCtrl.setRoot('HomePage');
                        });
                    }
                })
                    .catch(function (e) {
                    loading_2.dismiss();
                    _this.toastCtrl.create({
                        message: 'Error: ' + e.message,
                        duration: 3000,
                    }).present();
                });
                //loading.dismiss();
            }
            else {
                this.toastCtrl.create({
                    message: 'Please Fill Required Inputs',
                    duration: 3000,
                }).present();
            }
        }
        catch (e) {
            alert("Error: " + e.message);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Slides */])
    ], AuthPage.prototype, "slides", void 0);
    AuthPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-auth',template:/*ion-inline-start:"/Users/texpotppl/Desktop/Personal/Projects/Facebook/Benish/BarcodeProject/src/pages/auth/auth.html"*/'<ion-header no-border  >\n  <ion-navbar no-padding no-margin hideBackButton>\n    <h1 text-center >{{ heading }}</h1>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <ion-slides class="swiper-no-swiping">\n          <ion-slide>\n            <ion-grid>\n              <ion-row justify-content-center>\n                  <img src="assets/imgs/logo.png" no-margin no-padding >\n              </ion-row>\n              <ion-row justify-content-center>\n                  Welcome, Please Select An Option\n              </ion-row>\n              <ion-row justify-content-center align-items-center padding>\n                <button ion-button color="dark" outline (click)="toRegister()">I\'m New User</button>\n                <button ion-button color="dark" outline (click)="toLogin()">I\'m Registered User</button>\n              </ion-row>\n            </ion-grid>\n          </ion-slide>\n          <ion-slide>\n            <ion-grid>\n              <ion-row justify-content-center>\n                <ion-item>\n                  <ion-label floating>Name*</ion-label>\n                  <ion-input type="text" [(ngModel)]="user.name" color="dark"></ion-input>\n                </ion-item>\n              </ion-row>\n              <ion-row justify-content-center>\n                <ion-item>\n                  <ion-label floating>Email Address*</ion-label>\n                  <ion-input type="text" [(ngModel)]="user.email" color="dark"></ion-input>\n                </ion-item>\n              </ion-row>\n              <ion-row justify-content-center>\n                <ion-item>\n                  <ion-label floating>Password*</ion-label>\n                  <ion-input type="password" [(ngModel)]="user.password" color="dark"></ion-input>\n                </ion-item>\n              </ion-row>\n              <ion-row justify-content-center>\n                <ion-item>\n                  <ion-label floating>Gender</ion-label>\n                  <ion-select [(ngModel)]="user.gender" color="dark">\n                    <ion-option value="Male">Male</ion-option>\n                    <ion-option value="female">Female</ion-option>\n                  </ion-select>\n                </ion-item>\n              </ion-row>\n              <ion-row justify-content-center>\n                <ion-item>\n                  <ion-label floating>Address</ion-label>\n                  <ion-input type="text" [(ngModel)]="user.address" color="dark"></ion-input>\n                </ion-item>\n              </ion-row>\n              <ion-row justify-content-center align-items-center padding>\n                <button ion-button color="dark" outline (click)="toMainSlide()">Back</button>\n                <button ion-button color="dark" outline (click)="RegisterUser(user)">Register</button>\n              </ion-row>\n            </ion-grid>\n          </ion-slide>\n          <ion-slide>\n            <ion-grid>\n              <ion-row justify-content-center>\n                <ion-item>\n                  <ion-label floating>Email Address</ion-label>\n                  <ion-input type="text" [(ngModel)]="user.email"></ion-input>\n                </ion-item>\n              </ion-row>\n              <ion-row justify-content-center>\n                <ion-item>\n                  <ion-label floating>Password</ion-label>\n                  <ion-input type="password" [(ngModel)]="user.password"></ion-input>\n                </ion-item>\n              </ion-row>\n              <ion-row justify-content-center align-items-center padding>\n                <button ion-button color="dark" outline (click)="toMainSlide()">Back</button>\n                <button ion-button color="dark" outline (click)="LoginUser(user)">Login</button>\n              </ion-row>\n            </ion-grid>\n          </ion-slide>\n        </ion-slides>\n      </ion-col>\n    </ion-row>\n</ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/texpotppl/Desktop/Personal/Projects/Facebook/Benish/BarcodeProject/src/pages/auth/auth.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_3__angular_fire_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], AuthPage);
    return AuthPage;
}());

//# sourceMappingURL=auth.js.map

/***/ })

});
//# sourceMappingURL=8.js.map