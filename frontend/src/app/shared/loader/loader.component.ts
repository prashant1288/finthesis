import { Component, OnInit } from '@angular/core';
import {LoaderService} from './loader.service';

@Component({
    
    selector: 'loader',
    templateUrl: './loader.component.html'
})
export class LoaderComponent{

    showLoader:boolean = false;
    totalRequest:number = 0;
    
    constructor( private _loaderService:LoaderService) {
        _loaderService.stream.subscribe( res => {
            if(res)
                this.totalRequest++;
            else{
                if(this.totalRequest > 0){
                    this.totalRequest--;
                }
            }
           this.showLoader = true;
           this.showLoader = this.totalRequest > 0 ? true:false; 
        });

    }

}