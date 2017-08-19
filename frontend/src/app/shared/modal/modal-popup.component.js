"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ModalPopupComponent = (function () {
    function ModalPopupComponent() {
        this.size = 'small';
        this.closable = true;
        this.maximizable = false;
        this.modalWithTabs = false;
        this.modalCloseEvent = new core_1.EventEmitter();
        this.maxScreen = false;
        this.showModal = false;
    }
    ModalPopupComponent.prototype.show = function () {
        this.showModal = true;
    };
    ModalPopupComponent.prototype.hide = function () {
        this.showModal = false;
    };
    ModalPopupComponent.prototype.emitClose = function () {
        this.modalCloseEvent.emit({ close: true });
    };
    ModalPopupComponent.prototype.toggleScreen = function () {
        this.maxScreen = !this.maxScreen;
    };
    ModalPopupComponent.prototype.onScroll = function (e) {
        var cardFooterFixed = document.getElementById("cardFooterFixed");
        if (cardFooterFixed) {
            cardFooterFixed.style.right = 20 - (e.target.scrollLeft) + "px";
        }
    };
    return ModalPopupComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ModalPopupComponent.prototype, "id", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ModalPopupComponent.prototype, "size", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ModalPopupComponent.prototype, "closable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ModalPopupComponent.prototype, "maximizable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ModalPopupComponent.prototype, "modalWithTabs", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ModalPopupComponent.prototype, "modalCloseEvent", void 0);
ModalPopupComponent = __decorate([
    core_1.Component({
        selector: 'modalpopup',
        template: require('./modal.component.html'),
    })
], ModalPopupComponent);
exports.ModalPopupComponent = ModalPopupComponent;
