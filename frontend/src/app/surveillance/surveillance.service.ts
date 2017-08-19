import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { ISurvResultSummary } from './models/survResultSummary.model';
import { ISurvResultDetail } from './models/survResultDetail.model';;
import {AppService} from '../app.service';

@Injectable()
export class SurveillanceService {

  private _resultSummary = 'assets/resultsummary.json';
  private _resultDetail = 'assets/resultDetail.json';

  private _apiUrl = 'http://localhost:8080/';
  controllerSurveillance: string = 'surveillance/';
  getReportSummaryPath: string = 'getResultSummary';

  summaryColumnTitles: string[] = ['EvtDate', 'ReportDate', 'LastRunDate', 'ControlID', 'ControlShortName', 'ControlFullName', 'TotalTradecount', 
                                   'AlertCount', 'AlertPassCount', 'ActualFailCount', 'Status', 'AssignedTo', 'IsEscalated', 'LastActionedBy', 
                                   'LastActionedOn', 'ActionHistory', 'Comments'];
  summaryColumnFields: string[] = ['evtDate', 'reportDate', 'lastRunDate', 'controlID', 'controlShortName', 'controlFullName', 'totalTradecount', 
                                   'alertCount', 'alertPassCount', 'actualFailCount', 'status', 'assignedTo', 'isEscalated', 'lastActionedBy', 
                                   'lastActionedOn', 'actionHistory', 'comments'];
  detailColumnTitles: string[] = ['ReportDate', 'ControlID', 'ControlShortName', 'EventID', 'AssetClass', 'Instrument', 'USI', 'UTI', 
                                  'SwapLinkID', 'BuyerName', 'SellerName', 'BuyUSDNotionalAmt', 'BuyRatePrice', 'SellUSDNotionalAmt', 
                                  'SellRatePrice', 'NumOfUnits', 'BuyerTranscID', 'SellerTranscID'];
  detailColumnFields: string[] = ['reportDate', 'controlID', 'controlShortName', 'eventID', 'assetClass', 'instrument', 'USI', 'UTI', 
                                  'swapLinkID', 'buyerName', 'sellerName', 'buyUSDNotionalAmt', 'buyRatePrice', 'sellUSDNotionalAmt', 
                                  'sellRatePrice', 'numOfUnits', 'buyerTranscID', 'sellerTranscID'];

  constructor(private _http: Http, private _appService: AppService) { }

  getSummaryColumnTitles() {
    return this.summaryColumnTitles;
  }

  getSummaryColumnFields() {
    return this.summaryColumnFields;
  }

  getDetailColumnTitles() {
    return this.detailColumnTitles;
  }

  getDetailColumnFields() {
    return this.detailColumnFields;
  }

  getReportSummaryByDate(): Observable<ISurvResultSummary> {
    // return this._http.get(this._resultSummary)
      return this._http.get(this._apiUrl + this.controllerSurveillance + this.getReportSummaryPath)
      .map((response: Response) => <ISurvResultSummary>response.json())
      .do(data => console.log('All : ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getReportDetail(): Observable<ISurvResultDetail> {
    return this._http.get(this._resultDetail)
      .map((response: Response) => <ISurvResultDetail>response.json())
      .do(data => console.log('All : ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  downloadSurvSummaryReport(data: ISurvResultSummary) {
    let url = this._apiUrl + this.controllerSurveillance + "summaryreport/" + data.reportDate;
    var filename = "Surveillance " + data.reportDate + " Summary Report.xlsx";
    var responseContType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    return this._appService.downloadExcel(
      url, "GET", null, filename, responseContType
    )
  }

  downloadSurvDetailReport(data: ISurvResultDetail) {
    let url = this._apiUrl + this.controllerSurveillance + "detailreport/" + data.reportDate;
    var filename = "Surveillance " + data.reportDate + " Detail Report.xlsx";
    var responseContType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    return this._appService.downloadExcel(
      url, "GET", null, filename, responseContType
    )
  }


}
