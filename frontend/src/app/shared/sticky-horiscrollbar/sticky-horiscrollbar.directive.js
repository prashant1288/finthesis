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
var StickyHoriScrollbarDirective = (function () {
    function StickyHoriScrollbarDirective(el) {
        this.showStickyScrollbar = false;
        this.scrollbarNeeded = false;
        this.table = el.nativeElement;
    }
    StickyHoriScrollbarDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        if (this.scrollXContainer) {
            this.scrollXContainer.removeEventListener("scroll", function () { return _this.onScrollX(); }, false);
        }
        window.removeEventListener("resize", function () { return _this.resizeScrollbarWidth(); }, false);
        this.stickyScrollbar.removeEventListener("scroll", function () { return _this.onScrollbarScrollY(); }, false);
    };
    StickyHoriScrollbarDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.containerXIdentifier) {
            this.init();
            this.scrollXContainer = document.getElementById(this.containerXIdentifier);
            this.scrollXContainer.addEventListener("scroll", function () { return _this.onScrollX(); });
            window.addEventListener("resize", function () { return _this.resizeScrollbarWidth(); });
        }
    };
    StickyHoriScrollbarDirective.prototype.init = function () {
        var _this = this;
        if (this.table.scrollWidth > this.table.offsetWidth) {
            this.scrollbarNeeded = true;
        }
        this.stickyScrollbar = document.createElement("div");
        this.stickyScrollbar.style.position = "fixed";
        this.stickyScrollbar.style.width = this.table.offsetWidth + "px";
        this.stickyScrollbar.style.bottom = "0";
        this.stickyScrollbar.style.overflowX = "scroll";
        this.stickyScrollbar.style.display = "none";
        this.stickyScrollbar.addEventListener("scroll", function () { return _this.onScrollbarScrollY(); });
        this.fakeContent = document.createElement("div");
        this.fakeContent.style.width = this.table.scrollWidth + "px";
        this.fakeContent.style.height = "1px";
        this.stickyScrollbar.appendChild(this.fakeContent);
        this.table.appendChild(this.stickyScrollbar);
        this.tRowHeight = this.table.getElementsByTagName("td")[0].offsetHeight;
    };
    StickyHoriScrollbarDirective.prototype.onScrollX = function () {
        if (this.scrollbarNeeded) {
            this.showOrHideScrollbar();
        }
    };
    StickyHoriScrollbarDirective.prototype.showOrHideScrollbar = function () {
        var scrollPos = this.scrollXContainer.scrollTop + this.scrollXContainer.offsetHeight;
        var tableOffsetTop = this.getYPosition(this.table, this.scrollXContainer);
        var tableOffsetBottom = tableOffsetTop + this.table.offsetHeight;
        tableOffsetTop += this.tRowHeight;
        if (this.showStickyScrollbar && (scrollPos < tableOffsetTop || scrollPos > tableOffsetBottom)) {
            this.hideScrollbar();
        }
        else if (!this.showStickyScrollbar && scrollPos >= tableOffsetTop && scrollPos <= tableOffsetBottom) {
            this.stickyScrollbar.style.display = "block";
            this.stickyScrollbar.scrollLeft = this.table.scrollLeft;
            this.showStickyScrollbar = true;
        }
    };
    StickyHoriScrollbarDirective.prototype.hideScrollbar = function () {
        this.stickyScrollbar.style.display = "none";
        this.showStickyScrollbar = false;
    };
    StickyHoriScrollbarDirective.prototype.resizeScrollbarWidth = function () {
        if (this.table.scrollWidth > this.table.offsetWidth) {
            this.scrollbarNeeded = true;
            this.showOrHideScrollbar();
        }
        else {
            this.scrollbarNeeded = false;
            this.hideScrollbar();
        }
        this.fakeContent.style.width = this.table.scrollWidth + "px";
        this.stickyScrollbar.style.width = this.table.offsetWidth + "px";
    };
    StickyHoriScrollbarDirective.prototype.onScrollbarScrollY = function () {
        this.table.scrollLeft = this.stickyScrollbar.scrollLeft;
    };
    StickyHoriScrollbarDirective.prototype.getYPosition = function (el, outestParent) {
        var yPos = 0;
        while (el) {
            if (el.tagName == "BODY") {
                var yScroll = el.scrollTop || document.documentElement.scrollTop;
                yPos += (el.offsetTop - yScroll + el.clientTop);
            }
            else {
                yPos += (el.offsetTop - el.scrollTop + el.clientTop);
            }
            el = el.offsetParent;
            if (el && el.isSameNode(outestParent)) {
                break;
            }
        }
        return yPos;
    };
    return StickyHoriScrollbarDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], StickyHoriScrollbarDirective.prototype, "containerXIdentifier", void 0);
StickyHoriScrollbarDirective = __decorate([
    core_1.Directive({
        selector: '[sticky-horiscrollbar]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], StickyHoriScrollbarDirective);
exports.StickyHoriScrollbarDirective = StickyHoriScrollbarDirective;
