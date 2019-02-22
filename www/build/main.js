webpackJsonp([9],{

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_fire_firestore__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserProvider = /** @class */ (function () {
    function UserProvider(afs) {
        this.afs = afs;
    }
    UserProvider.prototype.setCurrentUser = function (user) {
        this.currentUser = user;
    };
    UserProvider.prototype.getCurrentUser = function () {
        console.log('Returning Current User => ' + this.currentUser);
        return this.currentUser;
    };
    UserProvider.prototype.getFamilyMembers = function () {
        var _this = this;
        console.log('Finding members of ' + this.currentUser.family);
        return this.afs.collection('Users', function (ref) { return ref.where('family', '==', _this.currentUser.family); }).snapshotChanges().pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (actions) { return actions.map(function (a) {
            var data = a.payload.doc.data();
            data.id = a.payload.doc.id;
            return data;
        }); }));
    };
    UserProvider.prototype.DeleteMember = function (id) {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.afs.collection('Users').doc(id).update({
                family: id + "_family"
            }).then(function () {
                res();
            })
                .catch(function (e) { return rej(e); });
        });
    };
    UserProvider.prototype.setFamily = function (newFamily) {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.afs.collection('Users').doc(_this.currentUser.id).update({
                family: newFamily
            }).then(function () {
                _this.currentUser.family = newFamily;
                res();
            })
                .catch(function (e) { return rej(e); });
        });
    };
    UserProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_fire_firestore__["a" /* AngularFirestore */]])
    ], UserProvider);
    return UserProvider;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_fire_firestore__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ItemsProvider = /** @class */ (function () {
    function ItemsProvider(afs) {
        this.afs = afs;
        this.items = [];
    }
    ItemsProvider.prototype.generateUniqueID = function () {
        var _this = this;
        return new Promise(function (res) {
            var id;
            while (true) {
                id = Math.floor(Math.random() * Math.floor(1000));
                console.log('new key ' + id);
                if (_this.items.length > 0) {
                    if (_this.items.find(function (o) { return o.id != id; })) {
                        console.log(id + ' is an unique key');
                        break;
                    }
                }
                else
                    break;
            }
            res(id);
        });
    };
    ItemsProvider.prototype.addItem = function (item, familyName) {
        var _this = this;
        return new Promise(function (res) {
            var doc = _this.afs.doc('Items/' + familyName);
            var sub = doc.valueChanges().subscribe(function (itemsList) {
                _this.items = itemsList['items'];
                if (!_this.items)
                    _this.items = [];
                _this.generateUniqueID().then(function (id) {
                    item.id = id;
                    item.isTrash = false;
                    _this.items.push(item);
                    sub.unsubscribe();
                    doc.update({ items: _this.items })
                        .then(function () {
                        res();
                    });
                });
            });
        });
    };
    ItemsProvider.prototype.getList = function (familyName) {
        return this.afs.doc('Items/' + familyName).valueChanges();
    };
    ItemsProvider.prototype.movetoTrash = function (id, familyName) {
        var _this = this;
        var doc = this.afs.doc('Items/' + familyName);
        var sub = doc.valueChanges().subscribe(function (itemsList) {
            _this.items = itemsList['items'];
            var item = _this.items.find(function (o) { return o.id == id; });
            item.isTrash = true;
            sub.unsubscribe();
            doc.update({ items: _this.items });
        });
    };
    ItemsProvider.prototype.movetoCart = function (id, familyName) {
        var _this = this;
        var doc = this.afs.doc('Items/' + familyName);
        var sub = doc.valueChanges().subscribe(function (itemsList) {
            _this.items = itemsList['items'];
            var item = _this.items.find(function (o) { return o.id == id; });
            item.isTrash = false;
            sub.unsubscribe();
            doc.update({ items: _this.items });
        });
    };
    ItemsProvider.prototype.deleteItem = function (id, familyName) {
        var _this = this;
        var doc = this.afs.doc('Items/' + familyName);
        var sub = doc.valueChanges().subscribe(function (itemsList) {
            _this.items = itemsList['items'].filter(function (item) {
                if (item.id == id)
                    return false;
                else
                    return true;
            });
            sub.unsubscribe();
            doc.update({ items: _this.items });
        });
    };
    ItemsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_fire_firestore__["a" /* AngularFirestore */]])
    ], ItemsProvider);
    return ItemsProvider;
}());

//# sourceMappingURL=items.js.map

/***/ }),

/***/ 230:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 230;

/***/ }),

/***/ 271:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/auth/auth.module": [
		586,
		8
	],
	"../pages/cart/cart.module": [
		587,
		7
	],
	"../pages/custom/custom.module": [
		588,
		6
	],
	"../pages/family-invite/family-invite.module": [
		594,
		5
	],
	"../pages/family-join/family-join.module": [
		589,
		4
	],
	"../pages/family/family.module": [
		590,
		3
	],
	"../pages/home/home.module": [
		591,
		2
	],
	"../pages/setting/setting.module": [
		592,
		1
	],
	"../pages/trash/trash.module": [
		593,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 271;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(456);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_local_notifications__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_fire__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_fire_firestore__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_fire_auth__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_firebase_config__ = __webpack_require__(585);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_items_items__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_user_user__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ngx_qrcode2__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_barcode_scanner__ = __webpack_require__(332);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/auth/auth.module#AuthPageModule', name: 'AuthPage', segment: 'auth', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cart/cart.module#CartPageModule', name: 'CartPage', segment: 'cart', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/custom/custom.module#CustomPageModule', name: 'CustomPage', segment: 'custom', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/family-join/family-join.module#FamilyJoinPageModule', name: 'FamilyJoinPage', segment: 'family-join', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/family/family.module#FamilyPageModule', name: 'FamilyPage', segment: 'family', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/setting/setting.module#SettingPageModule', name: 'SettingPage', segment: 'setting', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/trash/trash.module#TrashPageModule', name: 'TrashPage', segment: 'trash', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/family-invite/family-invite.module#FamilyInvitePageModule', name: 'FamilyInvitePage', segment: 'family-invite', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_13_ngx_qrcode2__["a" /* NgxQRCodeModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_fire__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_10__app_firebase_config__["a" /* FIREBASE_CONFIG */]),
                __WEBPACK_IMPORTED_MODULE_8__angular_fire_firestore__["b" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_fire_auth__["b" /* AngularFireAuthModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_local_notifications__["a" /* LocalNotifications */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_11__providers_items_items__["a" /* ItemsProvider */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* ToastController */],
                __WEBPACK_IMPORTED_MODULE_12__providers_user_user__["a" /* UserProvider */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 584:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_fire_auth__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_user_user__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_items_items__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_fire_firestore__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, afAuth, afs, userService, itemService) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.afAuth = afAuth;
        this.afs = afs;
        this.userService = userService;
        this.itemService = itemService;
        this.rootPage = '';
        var auth = this.afAuth.authState.subscribe(function (data) {
            if (data && data.uid && data.email) {
                if (userService.getCurrentUser() == null) {
                    var sub_1 = _this.afs.doc('Users/' + data.uid).valueChanges()
                        .subscribe(function (user) {
                        console.log('User Found during Check-Auth: ' + user.name);
                        user.id = data.uid;
                        _this.userService.setCurrentUser(user);
                        sub_1.unsubscribe();
                        auth.unsubscribe();
                        _this.rootPage = 'HomePage';
                    });
                }
            }
            else {
                auth.unsubscribe();
                _this.rootPage = 'AuthPage';
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
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleBlackTranslucent();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        var _this = this;
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.title != "Logout")
            this.nav.setRoot(page.component);
        else {
            this.afAuth.auth.signOut().then(function () {
                _this.nav.setRoot('AuthPage');
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/texpotppl/Desktop/Personal/Projects/Facebook/Benish/BarcodeProject/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar color="dark">\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        <ion-icon name="{{p.icon}}" color="dark"></ion-icon> {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/texpotppl/Desktop/Personal/Projects/Facebook/Benish/BarcodeProject/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_7__angular_fire_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_5__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_items_items__["a" /* ItemsProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 585:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FIREBASE_CONFIG; });
var FIREBASE_CONFIG = {
    apiKey: "AIzaSyCqY-MIwM-xvGH8rJSfc2ZSOPO3u9VkKKk",
    authDomain: "barcodeproject-7aca0-2f278.firebaseapp.com",
    databaseURL: "https://barcodeproject-7aca0-2f278.firebaseio.com",
    projectId: "barcodeproject-7aca0-2f278",
    storageBucket: "barcodeproject-7aca0-2f278.appspot.com",
    messagingSenderId: "119373423473"
};
//# sourceMappingURL=app.firebase.config.js.map

/***/ })

},[334]);
//# sourceMappingURL=main.js.map