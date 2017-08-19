import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

export type MODAL_SIZE = 'small' | 'large' | 'xtraLarge' | 'fullScreen';


@Component({

    selector: 'modalpopup',
    templateUrl: './modal.component.html'
})

export class ModalPopupComponent {
    @Input() id;
    @Input() size: MODAL_SIZE = 'small';
    @Input() closable: boolean = true;
    @Input() maximizable: boolean = false;
    @Input() modalWithTabs: boolean = false;    
    @Output() modalCloseEvent = new EventEmitter();

    maxScreen: boolean = false;
    showModal: boolean = false;

    show() {
        this.showModal = true;
    }

    hide() {
        this.showModal = false;
    }

    private emitClose() {
        this.modalCloseEvent.emit({ close: true });
    }

    toggleScreen() {
        this.maxScreen = !this.maxScreen;
    }

    onScroll(e) {
        let cardFooterFixed = document.getElementById("cardFooterFixed");
        if (cardFooterFixed) {
            cardFooterFixed.style.right = 20 - (e.target.scrollLeft) + "px";
        }
    }

}