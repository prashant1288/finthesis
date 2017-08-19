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
var ScrollToComponent = (function () {
    function ScrollToComponent() {
        this.top = "top";
        this.bottom = "bottom";
    }
    ScrollToComponent.prototype.ngOnInit = function () {
        this.jqueryContainer = $("#" + this.containerIdentifier);
        if (this.direction === this.bottom) {
            this.displayLabel = "scroll to bottom";
        }
        else {
            this.displayLabel = "back to top";
        }
        if (this.direction === this.bottom) {
            this.jqueryContainer.scroll(function () {
                var scrollPos = $(this).scrollTop();
                var heightOfContainer = $(this).prop("scrollHeight");
                if (scrollPos < heightOfContainer - $(this).height() - 300) {
                    $('.scroll-to').fadeIn();
                }
                else {
                    $('.scroll-to').fadeOut();
                }
            });
        }
        else {
            this.jqueryContainer.scroll(function () {
                var scrollPos = $(this).scrollTop();
                if (scrollPos > 300) {
                    $('.scroll-to').fadeIn();
                }
                else {
                    $('.scroll-to').fadeOut();
                }
            });
        }
    };
    ScrollToComponent.prototype.scrollTo = function () {
        if (this.direction === this.bottom) {
            this.scrollToBottom();
        }
        else {
            this.scrollToTop();
        }
    };
    ScrollToComponent.prototype.scrollToTop = function () {
        this.jqueryContainer.animate({
            scrollTop: 0
        }, 600);
        return false;
    };
    ScrollToComponent.prototype.scrollToBottom = function () {
        this.jqueryContainer.animate({
            scrollTop: this.jqueryContainer.prop("scrollHeight")
        }, 600);
        return false;
    };
    return ScrollToComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ScrollToComponent.prototype, "containerIdentifier", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ScrollToComponent.prototype, "direction", void 0);
ScrollToComponent = __decorate([
    core_1.Component({
        selector: 'scrollto',
        template: "\n        <div class=\"scroll-to\" (click)=\"scrollTo()\"><em [class.ion-chevron-up]=\"direction === top\" [class.ion-chevron-down]=\"direction === bottom\"></em>&nbsp;&nbsp;{{displayLabel}}</div>\n    ",
        styleUrls: ['./scrollto.component.css']
    })
], ScrollToComponent);
exports.ScrollToComponent = ScrollToComponent;
