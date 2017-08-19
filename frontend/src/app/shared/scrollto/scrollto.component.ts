import { Component, OnInit, Input } from '@angular/core';
declare var $: any;

@Component({
    selector: 'scrollto',
    template: `
        <div class="scroll-to" (click)="scrollTo()"><em [class.ion-chevron-up]="direction === top" [class.ion-chevron-down]="direction === bottom"></em>&nbsp;&nbsp;{{displayLabel}}</div>
    `,
    styleUrls: ['./scrollto.component.css']
})

export class ScrollToComponent implements OnInit {
    // containerIdentifier must be id
    @Input() containerIdentifier: string;
    @Input() direction: string;

    private jqueryContainer: any;
    top: string = "top";
    bottom: string = "bottom";
    displayLabel: string;

    ngOnInit() {
        // prepare for jquery obj, see if can use native javascript in future instead.
        this.jqueryContainer = $("#" + this.containerIdentifier);

        if (this.direction === this.bottom) {
            this.displayLabel = "scroll to bottom";
        } else {
            this.displayLabel = "back to top";
        }

        if (this.direction === this.bottom) {
            this.jqueryContainer.scroll(function () {
                let scrollPos = $(this).scrollTop();
                let heightOfContainer = $(this).prop("scrollHeight");
                if (scrollPos < heightOfContainer - $(this).height() - 300) {
                    $('.scroll-to').fadeIn();
                } else {
                    $('.scroll-to').fadeOut();
                }
            });
        } else {
            this.jqueryContainer.scroll(function () {
                let scrollPos = $(this).scrollTop();
                if (scrollPos > 300) {
                    $('.scroll-to').fadeIn();
                } else {
                    $('.scroll-to').fadeOut();
                }
            });
        }
    }

    scrollTo() {
        if (this.direction === this.bottom) {
            this.scrollToBottom();
        } else {
            this.scrollToTop();
        }
    }

    scrollToTop() {
        this.jqueryContainer.animate({
            scrollTop: 0
        }, 600);
        return false;
    }

    scrollToBottom() {
        this.jqueryContainer.animate({
            scrollTop: this.jqueryContainer.prop("scrollHeight")
        }, 600);
        return false;
    }
}