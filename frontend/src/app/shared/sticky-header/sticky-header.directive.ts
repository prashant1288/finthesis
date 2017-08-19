import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[sticky-header]'
})

export class StickyHeaderDirective implements AfterViewInit {
    // containerIdentifier can be id or class
    @Input() containerXIdentifier: string;
    @Input() containerYIdentifier: string;

    private table: HTMLElement; // table to implment sticky header
    private thead: any; // header row of the above table
    private scrollXContainer: any; // vertical scrolling container
    private scrollYContainer: any; // horizontal scrolling container

    private fixedDiv: any; // wrapper class for sticky header
    private clonedTable: any; // duplicated table inside sticky
    private clonedThead: any; // duplicate header inside sticky

    private showStickyHeader: boolean = false;

    constructor(el: ElementRef) {
        this.table = el.nativeElement;
    }

    ngOnDestroy() {
        if (this.scrollXContainer) {
            this.scrollXContainer.removeEventListener("scroll", () => this.onScrollX(), false);
        }
        if (this.containerYIdentifier) {
            this.scrollYContainer.removeEventListener("scroll", () => this.onScrollY());
        }
        window.removeEventListener("resize", () => this.resizeCellWidth(), false);
    }

    ngAfterViewInit() {
        if (this.containerXIdentifier) {
            this.init();
            this.scrollXContainer = document.getElementById(this.containerXIdentifier);
            if (this.containerYIdentifier) {
                this.scrollYContainer = document.getElementById(this.containerYIdentifier);
                this.scrollYContainer.addEventListener("scroll", () => this.onScrollY());
            }

            this.scrollXContainer.addEventListener("scroll", () => this.onScrollX());
            window.addEventListener("resize", () => this.resizeCellWidth());
        }
    }

    init() {
        this.fixedDiv = document.createElement("div");
        this.fixedDiv.className += " header-fixed";

        this.clonedTable = this.table.cloneNode();
        this.clonedTable.style.marginBottom = 0;
        this.clonedTable.style.position = "absolute";
        this.clonedTable.removeAttribute("sticky-header");

        this.thead = (this.table).getElementsByTagName("thead")[0];
        this.clonedThead = this.thead.cloneNode(true);
        this.fixedDiv.style.minHeight = this.thead.offsetHeight + 1 + "px";

        this.clonedTable.appendChild(this.clonedThead);
        this.fixedDiv.appendChild(this.clonedTable);
        this.table.parentElement.insertBefore(this.fixedDiv, this.table);

        this.resizeCellWidth();
    }

    onScrollX() {
        let scrollTopPos = this.scrollXContainer.scrollTop;
        let headerOffsetTop = this.getPosition(this.table, this.scrollXContainer).y;
        var headerOffsetBottom = headerOffsetTop + this.table.offsetHeight - this.thead.offsetHeight;
        if (scrollTopPos < headerOffsetTop && this.showStickyHeader || scrollTopPos > headerOffsetBottom && this.showStickyHeader) {
            this.fixedDiv.style.display = "none";
            this.showStickyHeader = false;
            // switch original header back
            this.clonedTable.appendChild(this.clonedThead);
            this.table.insertBefore(this.thead, this.table.firstChild);
        } else if (scrollTopPos >= headerOffsetTop && scrollTopPos <= headerOffsetBottom && !this.showStickyHeader) {
            this.fixedDiv.style.display = "block";
            this.showStickyHeader = true;
            // switch original header to sticky in order to have its events
            this.clonedTable.appendChild(this.thead);
            this.table.insertBefore(this.clonedThead, this.table.firstChild);
        }
    }

    onScrollY() {
        let headerOffsetLeft = this.getPosition(this.clonedTable, this.clonedTable.parentElement).y;
        let scrollLeftPos = this.scrollYContainer.scrollLeft;

        this.clonedTable.style.left = -scrollLeftPos + headerOffsetLeft + "px";
    }

    resizeCellWidthTrigger() {
        setTimeout(() => {
            this.resizeCellWidth();
        }, 100);
    }

    resizeCellWidth() {
        this.fixedDiv.style.maxWidth = this.table.parentElement.offsetWidth + "px";
        this.fixedDiv.style.minWidth = this.table.parentElement.offsetWidth + "px";

        let clonedHeaderCells = this.clonedTable.getElementsByTagName("th");
        for (let i = 0; i < clonedHeaderCells.length; i++) {
            let cell = clonedHeaderCells[i];
            let originalCell = this.table.getElementsByTagName("th")[i];
            cell.style.minWidth = originalCell.offsetWidth + "px";
            originalCell.style.minWidth = originalCell.offsetWidth + "px";
        }
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