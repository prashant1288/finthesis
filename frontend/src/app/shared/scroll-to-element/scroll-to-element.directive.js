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
var ScrollToElementDirective = (function () {
    function ScrollToElementDirective(el) {
        this.el = el.nativeElement;
    }
    ScrollToElementDirective.prototype.ngAfterViewInit = function () {
        if (this.containerXIdentifier) {
            this.scrollXContainer = document.getElementById(this.containerXIdentifier);
            this.headerOffsetTop = this.getPosition(this.el, this.scrollXContainer).y;
            for (var i = 0; i < 5000; i++) {
            }
            this.scrollToElement();
        }
    };
    ScrollToElementDirective.prototype.scrollToElement = function () {
        $("#" + this.containerXIdentifier).animate({
            scrollTop: this.headerOffsetTop
        }, 600);
    };
    ScrollToElementDirective.prototype.getPosition = function (el, outestParent) {
        var xPos = 0;
        var yPos = 0;
        while (el) {
            if (el.tagName == "BODY") {
                var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                var yScroll = el.scrollTop || document.documentElement.scrollTop;
                xPos += (el.offsetLeft - xScroll + el.clientLeft);
                yPos += (el.offsetTop - yScroll + el.clientTop);
            }
            else {
                xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                yPos += (el.offsetTop - el.scrollTop + el.clientTop);
            }
            el = el.offsetParent;
            if (el && el.isSameNode(outestParent)) {
                break;
            }
        }
        return {
            x: xPos,
            y: yPos
        };
    };
    return ScrollToElementDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ScrollToElementDirective.prototype, "containerXIdentifier", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ScrollToElementDirective.prototype, "containerYIdentifier", void 0);
ScrollToElementDirective = __decorate([
    core_1.Directive({
        selector: '[scroll-to-element]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ScrollToElementDirective);
exports.ScrollToElementDirective = ScrollToElementDirective;
