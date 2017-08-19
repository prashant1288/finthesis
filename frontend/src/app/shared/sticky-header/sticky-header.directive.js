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
var StickyHeaderDirective = (function () {
    function StickyHeaderDirective(el) {
        this.showStickyHeader = false;
        this.table = el.nativeElement;
    }
    StickyHeaderDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        if (this.scrollXContainer) {
            this.scrollXContainer.removeEventListener("scroll", function () { return _this.onScrollX(); }, false);
        }
        if (this.containerYIdentifier) {
            this.scrollYContainer.removeEventListener("scroll", function () { return _this.onScrollY(); });
        }
        window.removeEventListener("resize", function () { return _this.resizeCellWidth(); }, false);
    };
    StickyHeaderDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.containerXIdentifier) {
            this.init();
            this.scrollXContainer = document.getElementById(this.containerXIdentifier);
            if (this.containerYIdentifier) {
                this.scrollYContainer = document.getElementById(this.containerYIdentifier);
                this.scrollYContainer.addEventListener("scroll", function () { return _this.onScrollY(); });
            }
            this.scrollXContainer.addEventListener("scroll", function () { return _this.onScrollX(); });
            window.addEventListener("resize", function () { return _this.resizeCellWidth(); });
        }
    };
    StickyHeaderDirective.prototype.init = function () {
        this.fixedDiv = document.createElement("div");
        this.fixedDiv.className += " header-fixed";
        this.clonedTable = this.table.cloneNode();
        this.clonedTable.style.marginBottom = 0;
        this.clonedTable.style.position = "absolute";
        this.clonedTable.removeAttribute("sticky-header");
        this.thead = (this.table).getElementsByTagName("thead")[0];
        this.clonedThead = this.thead.cloneNode(true);
        this.fixedDiv.style.minHeight = this.thead.offsetHeight + 1 + "px";
        this.clonedTable.appendChild(this.clonedThead);
        this.fixedDiv.appendChild(this.clonedTable);
        this.table.parentElement.insertBefore(this.fixedDiv, this.table);
        this.resizeCellWidth();
    };
    StickyHeaderDirective.prototype.onScrollX = function () {
        var scrollTopPos = this.scrollXContainer.scrollTop;
        var headerOffsetTop = this.getPosition(this.table, this.scrollXContainer).y;
        var headerOffsetBottom = headerOffsetTop + this.table.offsetHeight - this.thead.offsetHeight;
        if (scrollTopPos < headerOffsetTop && this.showStickyHeader || scrollTopPos > headerOffsetBottom && this.showStickyHeader) {
            this.fixedDiv.style.display = "none";
            this.showStickyHeader = false;
            this.clonedTable.appendChild(this.clonedThead);
            this.table.insertBefore(this.thead, this.table.firstChild);
        }
        else if (scrollTopPos >= headerOffsetTop && scrollTopPos <= headerOffsetBottom && !this.showStickyHeader) {
            this.fixedDiv.style.display = "block";
            this.showStickyHeader = true;
            this.clonedTable.appendChild(this.thead);
            this.table.insertBefore(this.clonedThead, this.table.firstChild);
        }
    };
    StickyHeaderDirective.prototype.onScrollY = function () {
        var headerOffsetLeft = this.getPosition(this.clonedTable, this.clonedTable.parentElement).y;
        var scrollLeftPos = this.scrollYContainer.scrollLeft;
        this.clonedTable.style.left = -scrollLeftPos + headerOffsetLeft + "px";
    };
    StickyHeaderDirective.prototype.resizeCellWidthTrigger = function () {
        var _this = this;
        setTimeout(function () {
            _this.resizeCellWidth();
        }, 100);
    };
    StickyHeaderDirective.prototype.resizeCellWidth = function () {
        this.fixedDiv.style.maxWidth = this.table.parentElement.offsetWidth + "px";
        this.fixedDiv.style.minWidth = this.table.parentElement.offsetWidth + "px";
        var clonedHeaderCells = this.clonedTable.getElementsByTagName("th");
        for (var i = 0; i < clonedHeaderCells.length; i++) {
            var cell = clonedHeaderCells[i];
            var originalCell = this.table.getElementsByTagName("th")[i];
            cell.style.minWidth = originalCell.offsetWidth + "px";
            originalCell.style.minWidth = originalCell.offsetWidth + "px";
        }
    };
    StickyHeaderDirective.prototype.getPosition = function (el, outestParent) {
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
    return StickyHeaderDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], StickyHeaderDirective.prototype, "containerXIdentifier", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], StickyHeaderDirective.prototype, "containerYIdentifier", void 0);
StickyHeaderDirective = __decorate([
    core_1.Directive({
        selector: '[sticky-header]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], StickyHeaderDirective);
exports.StickyHeaderDirective = StickyHeaderDirective;
