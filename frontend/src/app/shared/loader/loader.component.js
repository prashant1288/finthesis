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
var loader_service_1 = require("./loader.service");
var LoaderComponent = (function () {
    function LoaderComponent(_loaderService) {
        var _this = this;
        this._loaderService = _loaderService;
        this.showLoader = false;
        this.totalRequest = 0;
        _loaderService.stream.subscribe(function (res) {
            if (res)
                _this.totalRequest++;
            else {
                if (_this.totalRequest > 0) {
                    _this.totalRequest--;
                }
            }
            _this.showLoader = true;
            _this.showLoader = _this.totalRequest > 0 ? true : false;
        });
    }
    return LoaderComponent;
}());
LoaderComponent = __decorate([
    core_1.Component({
        selector: 'loader',
        template: require('./loader.component.html')
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService])
], LoaderComponent);
exports.LoaderComponent = LoaderComponent;
