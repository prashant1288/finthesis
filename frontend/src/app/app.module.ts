
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { SurveillanceComponent } from './surveillance/surveillance.component';
import { SurveillanceModalComponent } from './surveillance/surveillance-form-modal.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { ConfigmgmtComponent } from './configmgmt/configmgmt.component';

import { SortedTableHeader, OrderByPipe, ScrollToComponent,ScrollToElementDirective, StickyHeaderDirective, StickyHoriScrollbarDirective,
        LoaderComponent, LoaderService, ModalPopupComponent} from './shared';


@NgModule({
  declarations: [
    AppComponent,
    SurveillanceComponent,
    SurveillanceModalComponent,
    DashboardComponent,
    ConfigmgmtComponent,
    SortedTableHeader,
    OrderByPipe,
    ScrollToComponent,
    ScrollToElementDirective,
    StickyHeaderDirective,
    StickyHoriScrollbarDirective,
    LoaderComponent,
    ModalPopupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'surveillance', component: SurveillanceComponent},
      { path: 'dashboard', component: DashboardComponent},
      { path: 'configmgmt', component: ConfigmgmtComponent},
      { path: '',  redirectTo: 'surveillance', pathMatch: 'full' }
    ])
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
