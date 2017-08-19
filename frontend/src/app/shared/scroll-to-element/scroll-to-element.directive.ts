import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';
declare var $: any;

@Directive({
    selector: '[scroll-to-element]'
})

export class ScrollToElementDirective implements AfterViewInit {
    // containerIdentifier must be id
    @Input() containerXIdentifier: string;
    @Input() containerYIdentifier: string;

    private el: HTMLElement; // table to implment sticky header
    private scrollXContainer: any; // vertical scrolling container
    private headerOffsetTop: number;

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }

    ngAfterViewInit() {
        if (this.containerXIdentifier) {
            this.scrollXContainer = document.getElementById(this.containerXIdentifier);
            this.headerOffsetTop = this.getPosition(this.el, this.scrollXContainer).y;
            for (let i=0; i< 5000; i++) {

            }
            this.scrollToElement();
        }
    }

    scrollToElement() {
        $("#" + this.containerXIdentifier).animate({
            scrollTop: this.headerOffsetTop
        }, 600);
        // return false;
    }
    
    // Helper function to get an element's exact position
    getPosition(el, outestParent) {
        let xPos = 0;
        let yPos = 0;

        while (el) {
            if (el.tagName == "BODY") {
                // deal with browser quirks with body/window/document and page scroll
                let xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                let yScroll = el.scrollTop || document.documentElement.scrollTop;

                xPos += (el.offsetLeft - xScroll + el.clientLeft);
                yPos += (el.offsetTop - yScroll + el.clientTop);
            } else {
                // for all other non-BODY elements
                xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                yPos += (el.offsetTop - el.scrollTop + el.clientTop);
            }

            el = el.offsetParent;
            if (el && el.isSameNode(outestParent)) {
                break;
            }
        }
        return {
            x: xPos,
            y: yPos
        };
    }

}