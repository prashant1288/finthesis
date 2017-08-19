import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { SurveillanceService } from './surveillance/surveillance.service';
import { LoaderComponent } from './shared';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [AppService, SurveillanceService]
})
export class AppComponent implements OnInit {
    private sideBarVisible: boolean = true;
    private route_dashboard: string = '/dashboard';
    private route_configmgmt: string = '/configmgmt';
    private route_surveillance: string = '/surveillance';

    constructor(private _appService: AppService, private _router: Router) { }

    ngOnInit() { };

    toggleSideBar() {
        this.sideBarVisible = !this.sideBarVisible;
    }

    getRouteName(): string {
        if (this._router.url == this.route_dashboard) {
            return 'Dashboard';
        } else if (this._router.url == this.route_configmgmt) {
            return 'Configuration Management';
        } else if (this._router.url == this.route_surveillance) {
            return 'Surveillance';
        }
        return 'Others';
    }
}
