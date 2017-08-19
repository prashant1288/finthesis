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
var DatePickerDirective = (function () {
    function DatePickerDirective(el) {
        this.abc = new core_1.EventEmitter();
        this.ngModelChange = new core_1.EventEmitter();
        this.el = el.nativeElement;
    }
    DatePickerDirective.prototype.ngOnInit = function () {
        var _this = this;
        $(this.el).datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'yy-mm-dd',
            onSelect: function (newText) {
                return $(this).trigger('change');
            }
        });
        this.setDefaultDate();
        $(this.el).on('change', function (event) {
            _this.ngModelChange.emit(event.target.value);
        });
    };
    ;
    DatePickerDirective.prototype.setDefaultDate = function () {
        if (this.defaultDate) {
            $(this.el).datepicker("option", "defaultDate", new Date(this.defaultDate));
            this.ngModelChange.emit(this.defaultDate);
        }
    };
    DatePickerDirective.prototype.ngOnDestroy = function () {
        $($(this.el).data('datepicker')).remove();
    };
    ;
    return DatePickerDirective;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DatePickerDirective.prototype, "abc", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DatePickerDirective.prototype, "defaultDate", void 0);
DatePickerDirective = __decorate([
    core_1.Directive({
        selector: '[datepicker]',
        outputs: [
            "ngModelChange"
        ]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], DatePickerDirective);
exports.DatePickerDirective = DatePickerDirective;
;
