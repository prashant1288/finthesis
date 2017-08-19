import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    
    selector: '[sorted-table-header]',
    templateUrl: './sorted-table-header.component.html'
})

export class SortedTableHeader{
    @Input() columnTitles : string[];
    @Input() jsonAttributes : string[];

    @Input() sortedByColumn : string;
    @Input() sortDescending : boolean;

    @Output() columnHeaderClick = new EventEmitter();

    private previouslySortedByColumn : string;

    constructor(){
        this.previouslySortedByColumn = "";
    }

    emit(){
        this.columnHeaderClick.emit(
            {
                sortedByColumn: this.sortedByColumn,
                sortDescending: this.sortDescending
            }
        )
    }

    onColumnTitleClick(justSelectedColumn){
        this.previouslySortedByColumn = this.sortedByColumn;
        this.sortedByColumn = justSelectedColumn;

        if(this.previouslySortedByColumn == justSelectedColumn){//same column is clicked
            this.toggleSortingOrder();//just change the sorting order
        }else{
            this.sortDescending = true;//default for a new column
        }
        this.emit();
    }

    toggleSortingOrder(){
        this.sortDescending = !this.sortDescending;
    }

}