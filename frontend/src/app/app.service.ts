import { Component, Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
//import {Response} from "@angular/http";
import { Http, Response } from '@angular/http';
import {LoaderService} from './shared/loader/loader.service';


@Injectable()
export class AppService {
    private _apiUrl = 'AppConstants.getValue("apiUrl");'

    constructor(private _loaderService: LoaderService) { }


     public downloadExcel(url: string, reqType: string, data: any, fileName: string, respContType: string) {
         console.log("URL : "+url);
        let thisContext = this;
        thisContext._loaderService.show();
        var xhr = new XMLHttpRequest();
        xhr.open(reqType, url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function () {
            if (xhr.status === 200) {
                var type = xhr.getResponseHeader('Content-Type');

                var blob = new Blob([xhr.response], { type: type });
                if (typeof window.navigator.msSaveBlob !== 'undefined') {
                    // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                    setTimeout(function () {
                        thisContext._loaderService.hide();
                    }, 100); // cleanup
                    window.navigator.msSaveBlob(blob, fileName);
                } else {
                    var URL = window.URL;
                    var downloadUrl = URL.createObjectURL(blob);

                    if (fileName) {
                        // use HTML5 a[download] attribute to specify filename
                        var a = document.createElement("a");
                        // safari doesn't support this yet
                        if (typeof a.getAttribute("download") === 'undefined') {
                            window.open(downloadUrl);
                        } else {
                            a.href = downloadUrl;
                            a.setAttribute("download", fileName);
                            document.body.appendChild(a);
                            a.click();
                        }
                    } else {
                        window.open(downloadUrl);
                    }
                    setTimeout(function () {
                        URL.revokeObjectURL(downloadUrl);
                        thisContext._loaderService.hide();
                    }, 100); // cleanup
                }
            } else {
                console.log("Error in downloading...");
                thisContext._loaderService.hide();
            }
        };
        xhr.setRequestHeader('Content-type', respContType);
        xhr.setRequestHeader('auth-header-env', 'Env-id');
        xhr.setRequestHeader('auth-header-ntid', 'User-id');
        xhr.setRequestHeader('auth-header-token', 'token-id');
        
        if (data != null) {
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
    }


}