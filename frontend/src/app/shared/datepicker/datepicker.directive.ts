import { Directive, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
declare let $: any;

@Directive({
    selector: '[datepicker]',
    outputs: [
        "ngModelChange"
    ]
})

export class DatePickerDirective implements OnInit {
    @Output() abc = new EventEmitter();
    @Input() defaultDate;
    //Emits changes to ngModel
    ngModelChange = new EventEmitter();
    el: HTMLElement;

    //Obtains the handle to the jQuery element
    constructor(el: ElementRef){
        this.el = el.nativeElement;
    }

    ngOnInit() {
        $(this.el).datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'yy-mm-dd',
            onSelect: function( newText ){
                return $(this).trigger('change');
            }
        });
        this.setDefaultDate();

        $(this.el).on('change', event => {
            //Emit new value
            this.ngModelChange.emit(event.target.value);
        });
    };

    setDefaultDate() {
        if (this.defaultDate) {
            $(this.el).datepicker("option", "defaultDate", new Date(this.defaultDate));
            this.ngModelChange.emit(this.defaultDate);
        }
    }

    ngOnDestroy() {
        //Clean up
        $($(this.el).data('datepicker')).remove();
    };
};