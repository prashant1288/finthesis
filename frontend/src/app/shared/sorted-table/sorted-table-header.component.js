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
var SortedTableHeader = (function () {
    function SortedTableHeader() {
        this.columnHeaderClick = new core_1.EventEmitter();
        this.previouslySortedByColumn = "";
    }
    SortedTableHeader.prototype.emit = function () {
        this.columnHeaderClick.emit({
            sortedByColumn: this.sortedByColumn,
            sortDescending: this.sortDescending
        });
    };
    SortedTableHeader.prototype.onColumnTitleClick = function (justSelectedColumn) {
        this.previouslySortedByColumn = this.sortedByColumn;
        this.sortedByColumn = justSelectedColumn;
        if (this.previouslySortedByColumn == justSelectedColumn) {
            this.toggleSortingOrder();
        }
        else {
            this.sortDescending = true;
        }
        this.emit();
    };
    SortedTableHeader.prototype.toggleSortingOrder = function () {
        this.sortDescending = !this.sortDescending;
    };
    return SortedTableHeader;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], SortedTableHeader.prototype, "columnTitles", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], SortedTableHeader.prototype, "jsonAttributes", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SortedTableHeader.prototype, "sortedByColumn", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SortedTableHeader.prototype, "sortDescending", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SortedTableHeader.prototype, "columnHeaderClick", void 0);
SortedTableHeader = __decorate([
    core_1.Component({
        selector: '[sorted-table-header]',
        template: require('./sorted-table-header.component.html')
    }),
    __metadata("design:paramtypes", [])
], SortedTableHeader);
exports.SortedTableHeader = SortedTableHeader;
