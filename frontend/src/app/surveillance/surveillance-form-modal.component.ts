import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ISurvResultDetail } from './models/survResultDetail.model';
import { ModalPopupComponent, OrderByPipe, StickyHeaderDirective } from '../shared';
import { SurveillanceService } from './surveillance.service';
declare var $: any;

@Component({
    selector: 'surveillance-form',
    templateUrl: './surveillance-form-modal.component.html',
    providers: [StickyHeaderDirective]
})

export class SurveillanceModalComponent implements OnInit {
    @ViewChild(ModalPopupComponent) modalPopup: ModalPopupComponent;
    @ViewChild(StickyHeaderDirective) stickyHeaderVc: StickyHeaderDirective;

    errorMessage: string;
    SurvResultDetail: ISurvResultDetail;
    resetFormState: boolean = false;
    private columnTitles: string[];
    private columnData: string[];

    /* Table Sorting */
    sortedByColumn: string = 'ReportDate';
    isDesc: boolean;
    direction: number;

    scrollXContainer: string = "main-container";
    scrollToDirection: string = "top";
    scrollYContainer: string = "scroll-y-container";

    constructor(private _surveillanceService: SurveillanceService) { }

    ngOnInit() {
        this.resetFormState = true;
        this.columnTitles = this._surveillanceService.getDetailColumnTitles();
        this.columnData = this._surveillanceService.getDetailColumnFields();
    }

    show() {
        this.modalPopup.show();
    }

    hide() {
        this.modalPopup.hide();
        this.resetFormState = false;
    }

    onModalCloseEmit($event) {
        if ($event.close) {
            this.hide();
        }
    }

    onColumnTitleClick(property) {
        this.isDesc = !this.isDesc; //change the direction
        this.sortedByColumn = property;
        this.direction = this.isDesc ? 1 : -1;
    }

    load(ReportDate: Date, ControlID: number) {
        console.log("inside form load function....");
        this._surveillanceService.getReportDetail()
            .subscribe(data => {
                this.SurvResultDetail = data;
                this.show();
            },
            error => { this.errorMessage = <any>error }
            )
    }

    downloadDetailReport() {
        this._surveillanceService.downloadSurvDetailReport(this.SurvResultDetail);
    }
    
}