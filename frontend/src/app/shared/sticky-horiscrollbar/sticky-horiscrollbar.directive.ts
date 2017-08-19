import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[sticky-horiscrollbar]'
})

export class StickyHoriScrollbarDirective implements AfterViewInit {
    @Input() containerXIdentifier: string;

    private scrollXContainer: any; // vertical scrolling container  
    private table: HTMLElement; // table to implment sticky scrollbar
    private tRowHeight: number; // scrollbar should appear after first table row

    private stickyScrollbar: any; // wrapper class for sticky scrollbar
    private fakeContent: any; // div inside stickyScrollbar to stretch the width

    private showStickyScrollbar: boolean = false;
    private scrollbarNeeded: boolean = false;


    constructor(el: ElementRef) {
        this.table = el.nativeElement;

    }

    ngOnDestroy() {
        if (this.scrollXContainer) {
            this.scrollXContainer.removeEventListener("scroll", () => this.onScrollX(), false);
        }
        window.removeEventListener("resize", () => this.resizeScrollbarWidth(), false);
        this.stickyScrollbar.removeEventListener("scroll", () => this.onScrollbarScrollY(), false);
    }

    ngAfterViewInit() {
        if (this.containerXIdentifier) {
            this.init();
            this.scrollXContainer = document.getElementById(this.containerXIdentifier);
            this.scrollXContainer.addEventListener("scroll", () => this.onScrollX());
            window.addEventListener("resize", () => this.resizeScrollbarWidth());
        }
    }

    init() {
        if (this.table.scrollWidth > this.table.offsetWidth) {
            this.scrollbarNeeded = true;
        }

        this.stickyScrollbar = document.createElement("div");
        this.stickyScrollbar.style.position = "fixed";
        this.stickyScrollbar.style.width = this.table.offsetWidth + "px";
        this.stickyScrollbar.style.bottom = "0";
        this.stickyScrollbar.style.overflowX = "scroll";
        this.stickyScrollbar.style.display = "none";
        this.stickyScrollbar.addEventListener("scroll", () => this.onScrollbarScrollY());

        this.fakeContent = document.createElement("div");
        this.fakeContent.style.width = this.table.scrollWidth + "px";
        this.fakeContent.style.height = "1px";

        this.stickyScrollbar.appendChild(this.fakeContent);
        this.table.appendChild(this.stickyScrollbar);

        // TODO add check
        this.tRowHeight = this.table.getElementsByTagName("td")[0].offsetHeight;
    }

    onScrollX() {
        if (this.scrollbarNeeded) {
            this.showOrHideScrollbar();
        }
    }

    showOrHideScrollbar() {
        let scrollPos = this.scrollXContainer.scrollTop + this.scrollXContainer.offsetHeight;
        let tableOffsetTop = this.getYPosition(this.table, this.scrollXContainer);
        var tableOffsetBottom = tableOffsetTop + this.table.offsetHeight;
        tableOffsetTop += this.tRowHeight;

        if (this.showStickyScrollbar && (scrollPos < tableOffsetTop || scrollPos > tableOffsetBottom)) {
            this.hideScrollbar();
        } else if (!this.showStickyScrollbar && scrollPos >= tableOffsetTop && scrollPos <= tableOffsetBottom) {
            this.stickyScrollbar.style.display = "block";
            this.stickyScrollbar.scrollLeft = this.table.scrollLeft;
            this.showStickyScrollbar = true;
        }
    }

    hideScrollbar() {
        this.stickyScrollbar.style.display = "none";
        this.showStickyScrollbar = false;
    }

    resizeScrollbarWidth() {
        if (this.table.scrollWidth > this.table.offsetWidth) {
            this.scrollbarNeeded = true;
            this.showOrHideScrollbar();
        } else {
            this.scrollbarNeeded = false;
            this.hideScrollbar();
        }
        this.fakeContent.style.width = this.table.scrollWidth + "px";
        this.stickyScrollbar.style.width = this.table.offsetWidth + "px";
    }

    onScrollbarScrollY() {
        this.table.scrollLeft = this.stickyScrollbar.scrollLeft;
    }

    // Helper function to get an element's exact position
    getYPosition(el, outestParent) {
        let yPos = 0;

        while (el) {
            if (el.tagName == "BODY") {
                // deal with browser quirks with body/window/document and page scroll
                let yScroll = el.scrollTop || document.documentElement.scrollTop;

                yPos += (el.offsetTop - yScroll + el.clientTop);
            } else {
                // for all other non-BODY elements
                yPos += (el.offsetTop - el.scrollTop + el.clientTop);
            }

            el = el.offsetParent;
            if (el && el.isSameNode(outestParent)) {
                break;
            }
        }
        return yPos;
    }

}
