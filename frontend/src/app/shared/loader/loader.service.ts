import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class LoaderService {
    private _subject = new Subject<boolean>();
    stream = this._subject.asObservable();
    
    show(){
       this._subject.next(true);           
    }

    hide(){
       this._subject.next(false);           
    }

}