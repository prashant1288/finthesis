import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class DashboardService {
    private _productUrl = 'assets/products.json';

    //   private _apiUrl = 'http://localhost:8080/' ;
    //   controllerDashboard: string = 'dashboard/';
    //   getMessagePath:string = 'getMessage';

    columnTitles: string[] = ['Book Name', 'Description', 'Category', 'Price', 'Rating'];
    columnFields: string[] = ['Name', 'Description', 'Category', 'Price', 'Rating'];

    constructor(private _http: Http) { }

    getProducts(): Observable<IProduct[]> {
        return this._http.get(this._productUrl)
            .map((response: Response) => <IProduct>response.json())
            .do(data => console.log('All : ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    // getMessage() {
    //     return this._http.get(this._apiUrl + this.controllerDashboard + this.getMessagePath)
    //         .map((response: Response) => response.text())
    //         .do(data => console.log('All : '))
    //         .catch(this.handleError);
    // }

    getColumnTitles() {
        return this.columnTitles;
    }

    getColumnFields() {
        return this.columnFields;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}