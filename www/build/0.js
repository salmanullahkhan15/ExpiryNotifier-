webpackJsonp([0],{

/***/ 593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrashPageModule", function() { return TrashPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__trash__ = __webpack_require__(602);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TrashPageModule = /** @class */ (function () {
    function TrashPageModule() {
    }
    TrashPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__trash__["a" /* TrashPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__trash__["a" /* TrashPage */]),
            ],
        })
    ], TrashPageModule);
    return TrashPageModule;
}());

//# sourceMappingURL=trash.module.js.map

/***/ }),

/***/ 602:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrashPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_items_items__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_user__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TrashPage = /** @class */ (function () {
    function TrashPage(navCtrl, navParams, itemsProvider, userService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.itemsProvider = itemsProvider;
        this.userService = userService;
        this.selecteditems = [];
        this.items = [];
        this.familyName = this.userService.getCurrentUser().family;
    }
    TrashPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.itemsProvider.getList(this.familyName).subscribe(function (itemsList) {
            _this.items = itemsList['items'].filter(function (item) {
                if (item.isTrash == true)
                    return true;
                else
                    return false;
            });
        });
        this.btnSelect('off');
    };
    TrashPage.prototype.RecoverItem = function (item) {
        this.itemsProvider.movetoCart(item, this.familyName);
    };
    TrashPage.prototype.itemSelected = function (item) {
        var index = this.selecteditems.indexOf(item);
        if (index > -1) {
            this.selecteditems.splice(index, 1);
            item.selected = false;
        }
        else {
            this.selecteditems.push(item);
            item.selected = true;
        }
    };
    TrashPage.prototype.toggleSelect = function (item, type) {
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
    TrashPage.prototype.btnSelect = function (type) {
        var _this = this;
        if (type == null)
            type = this.selecteditems.length > 0 ? "off" : "on";
        this.items.forEach(function (item) {
            _this.toggleSelect(item, type);
        });
    };
    TrashPage.prototype.btnDelete = function () {
        var _this = this;
        this.selecteditems.forEach(function (item) {
            _this.itemsProvider.deleteItem(item.id, _this.familyName);
        });
    };
    TrashPage.prototype.btnRecover = function () {
        var _this = this;
        this.selecteditems.forEach(function (item) {
            _this.itemsProvider.movetoCart(item.id, _this.familyName);
        });
    };
    TrashPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-trash',template:/*ion-inline-start:"/Users/texpotppl/Desktop/Personal/Projects/Facebook/Benish/BarcodeProject/src/pages/trash/trash.html"*/'<ion-header>\n  <ion-navbar color="dark">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Trash</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h5 ion-text color="dark"> Select Item(s) to Recover or Delete Forever</h5>\n  \n  <ion-list>\n    <ion-item stacked>\n      <ion-label col-4>Name</ion-label>\n      <ion-label col-4>Type</ion-label>\n      <ion-label col-4>Best Date</ion-label>\n    </ion-item>\n    <ion-item-sliding *ngFor="let item of items" (click)="itemSelected(item)">\n      <ion-item [ngClass]="{selected: item.selected, item: !item.selected}">\n        <ion-label col>{{ item.name }}</ion-label>\n        <ion-label col>{{ item.type }}</ion-label>\n        <ion-label col>{{ item.expiry}}</ion-label>\n      </ion-item>\n      <ion-item-options side="right">\n        <button ion-button color="dark" (click)="RecoverItem(item)">\n          Recover\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n  <ion-item stacked>\n    <button ion-button color="dark" outline col-4 (click)="btnSelect()">Select All </button>\n    <button ion-button color="dark" outline col-3 (click)="btnRecover()">Recover</button>\n    <button ion-button color="dark" outline col-3 (click)="btnDelete()">Delete</button>\n  </ion-item>\n</ion-content>\n'/*ion-inline-end:"/Users/texpotppl/Desktop/Personal/Projects/Facebook/Benish/BarcodeProject/src/pages/trash/trash.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_items_items__["a" /* ItemsProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_user_user__["a" /* UserProvider */]])
    ], TrashPage);
    return TrashPage;
}());

//# sourceMappingURL=trash.js.map

/***/ })

});
//# sourceMappingURL=0.js.map