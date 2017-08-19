import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ISurvResultSummary } from './models/survResultSummary.model';
import { SurveillanceService } from './surveillance.service';
import { OrderByPipe, StickyHeaderDirective } from '../shared';
import { GMTHelper } from '../shared/index';
import { LoaderService } from '../shared/loader/loader.service';
import { SurveillanceModalComponent } from './surveillance-form-modal.component';


@Component({
  templateUrl: './surveillance.component.html',
  providers: [StickyHeaderDirective]
})

export class SurveillanceComponent implements OnInit {
  @ViewChild(StickyHeaderDirective) stickyHeaderVc: StickyHeaderDirective;
  @ViewChild(SurveillanceModalComponent) surveillanceForm: SurveillanceModalComponent;

  errorMessage: string;
  reportFrom: string;
  reportTo: string;

  /* Table Sorting */
  sortedByColumn: string = 'reportDate';
  isDesc: boolean = false;
  direction: number;

  scrollXContainer: string = "main-container";
  scrollToDirection: string = "top";
  scrollYContainer: string = "scroll-y-container";

  private columnTitles: string[];
  private columnData: string[];

  SurvResultSummary: ISurvResultSummary;

  private tagTr: string = "tr";
  private strActive: string = "active";

  loaderService: LoaderService;
  constructor(private _surveillanceService: SurveillanceService,
    private _loaderService: LoaderService) {
    this.loaderService = _loaderService;
  }


  ngOnInit(): void {
    this.reportFrom = GMTHelper.convertToGMTDate(new Date());
    this._loaderService.hide();
    this.columnTitles = this._surveillanceService.getSummaryColumnTitles();
    this.columnData = this._surveillanceService.getSummaryColumnFields();
  }

  onColumnTitleClick(property) {
    this.isDesc = !this.isDesc; //change the direction
    this.sortedByColumn = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  onSearch() {
    this._surveillanceService.getReportSummaryByDate()
      .subscribe(data => this.SurvResultSummary = data,
      error => this.errorMessage = <any>error)
  }

  onSearchReset() { 
    this.reportFrom = undefined;
    this.reportTo = undefined;
  }

  /* clearDateInput(obj, attr) {
       obj[attr] = "";
  }   */
  clearDateInput(obj) {
    obj = "";
  }

  onRowClick(event: any) {
    let thisRow: HTMLElement = event.currentTarget;
    let thisTable: any = thisRow.parentNode;
    let otherRows = thisTable.getElementsByTagName(this.tagTr);
    for (let i = 0; i < otherRows.length; i++) {
      let tr = otherRows[i];
      tr.classList.remove(this.strActive);
    }
    thisRow.classList.add(this.strActive);
  }

  getDetails(ReportDate: Date, ControlID: number) {
    console.log("double click worked...");
    console.log(ReportDate);  //20170710
    console.log(ControlID);
    this.surveillanceForm.load(ReportDate, ControlID);
  }

  downloadSummaryReport(){
    this._surveillanceService.downloadSurvSummaryReport(this.SurvResultSummary);
  }

}
