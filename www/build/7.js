webpackJsonp([7],{

/***/ 587:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartPageModule", function() { return CartPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart__ = __webpack_require__(596);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CartPageModule = /** @class */ (function () {
    function CartPageModule() {
    }
    CartPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__cart__["a" /* CartPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__cart__["a" /* CartPage */]),
            ],
        })
    ], CartPageModule);
    return CartPageModule;
}());

//# sourceMappingURL=cart.module.js.map

/***/ }),

/***/ 596:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_items_items__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_local_notifications__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_barcode_scanner__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_user_user__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CartPage = /** @class */ (function () {
    function CartPage(navCtrl, navParams, itemsProvider, localNotifications, barcodeScanner, userService, toastCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.itemsProvider = itemsProvider;
        this.localNotifications = localNotifications;
        this.barcodeScanner = barcodeScanner;
        this.userService = userService;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.selecteditems = [];
        this.items = [];
        this.familyName = this.userService.getCurrentUser().family;
    }
    CartPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.itemsProvider.getList(this.familyName).subscribe(function (itemsList) {
            if (itemsList) {
                _this.items = itemsList['items'].filter(function (item) {
                    if (item.isTrash == true)
                        return false;
                    else
                        return true;
                });
                console.log(JSON.stringify(_this.items));
            }
            else
                _this.items = [];
        });
        this.btnSelect('off');
    };
    CartPage.prototype.customItem = function (item) {
        this.navCtrl.push('CustomPage', { items: [item] });
    };
    CartPage.prototype.itemSelected = function (item, index) {
        var i = this.selecteditems.indexOf(item);
        if (i > -1) {
            this.selecteditems.splice(i, 1);
            item.selected = false;
        }
        else {
            this.selecteditems.push(item);
            item.selected = true;
        }
    };
    CartPage.prototype.toggleSelect = function (item, type) {
        var index = this.selecteditems.indexOf(item);
        if (type == "off") {
            if (index > -1)
                this.selecteditems.splice(index, 1);
            item.selected = false;
        }
        else {
            if (index > -1) {
                // do nothing
            }
            else
                this.selecteditems.push(item);
            item.selected = true;
        }
    };
    CartPage.prototype.btnSelect = function (type) {
        var _this = this;
        if (type == null)
            type = this.selecteditems.length > 0 ? "off" : "on";
        this.items.forEach(function (item) {
            _this.toggleSelect(item, type);
        });
    };
    CartPage.prototype.btnDelete = function () {
        var _this = this;
        this.selecteditems.forEach(function (item) {
            _this.localNotifications.cancel(item.id);
            _this.itemsProvider.movetoTrash(item.id, _this.familyName);
        });
    };
    CartPage.prototype.btnCustom = function () {
        if (this.selecteditems.length > 0)
            this.navCtrl.push('CustomPage', { items: this.selecteditems.slice() });
    };
    CartPage.prototype.btnAdd = function () {
        var _this = this;
        // open camera for QRCode
        this.barcodeScanner.scan({
            prompt: 'Scan Item Barcode',
            preferFrontCamera: false,
            resultDisplayDuration: 0,
            formats: 'DATA_MATRIX'
        }).then(function (barcodeData) {
            if (barcodeData.text) {
                var loading_1 = _this.loadingCtrl.create({
                    content: 'Please wait...'
                });
                loading_1.present();
                _this.itemsProvider.addItem(JSON.parse(barcodeData.text), _this.userService.getCurrentUser().family)
                    .then(function () {
                    loading_1.dismiss();
                });
            }
        }).catch(function (err) {
            console.log('Error', err);
        });
    };
    CartPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cart',template:/*ion-inline-start:"/Users/texpotppl/Desktop/Personal/Projects/Facebook/Benish/BarcodeProject/src/pages/cart/cart.html"*/'<ion-header>\n  <ion-navbar color="dark">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Your Cart</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h5 ion-text color="dark"> Select Item(s) to Customize or Delete</h5>\n  \n  <ion-list>\n    <ion-item stacked>\n      <ion-label col-4>Name</ion-label>\n      <ion-label col-4>Type</ion-label>\n      <ion-label col-4>Best Date</ion-label>\n    </ion-item>\n    <ion-item-sliding *ngFor="let item of items" (click)="itemSelected(item)">\n      <ion-item [ngClass]="{selected: item.selected, item: !item.selected}">\n        <ion-label col>{{ item.name }}</ion-label>\n        <ion-label col>{{ item.type }}</ion-label>\n        <ion-label col>{{ item.expiry}}</ion-label>\n      </ion-item>\n      <ion-item-options side="right">\n        <button ion-button color="dark" (click)="customItem(item)">\n          Custom\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n  <ion-item>\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n          <button ion-button color="dark" outline col-12 col-sm (click)="btnAdd()">Add New Item</button>\n        </ion-col>\n        <ion-col>\n          <button ion-button color="dark" outline col-12 col-sm (click)="btnSelect()">Select All </button>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <button ion-button color="dark" outline col-12 col-sm (click)="btnDelete()">Delete</button>\n        </ion-col>\n        <ion-col>\n          <button ion-button color="dark" outline col-12 col-sm (click)="btnCustom()">Custom</button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-item>\n</ion-content>\n'/*ion-inline-end:"/Users/texpotppl/Desktop/Personal/Projects/Facebook/Benish/BarcodeProject/src/pages/cart/cart.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_items_items__["a" /* ItemsProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_local_notifications__["a" /* LocalNotifications */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_barcode_scanner__["a" /* BarcodeScanner */], __WEBPACK_IMPORTED_MODULE_5__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], CartPage);
    return CartPage;
}());

//# sourceMappingURL=cart.js.map

/***/ })

});
//# sourceMappingURL=7.js.map