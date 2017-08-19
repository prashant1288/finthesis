import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { DashboardService } from './dashboard.service';

@Component({
  templateUrl: './dashboard.component.html',
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  errorMessage: string;
  greeting: string;

  /* Table Sorting */
  private columnTitles: string[];
  private columnData: string[];

  /* search field data */

  constructor(private _dashboardService: DashboardService) {
  }

  Products: IProduct[];

  ngOnInit(): void {

    this.columnTitles = this._dashboardService.getColumnTitles();
    this.columnData = this._dashboardService.getColumnFields();

    this._dashboardService.getProducts()
      .subscribe(Products => this.Products = Products,
      error => this.errorMessage = <any>error);

    // this._dashboardService.getMessage()
    //   .subscribe(greeting => this.greeting = greeting,
    //              error => this.errorMessage = <any>error);
  }


}
