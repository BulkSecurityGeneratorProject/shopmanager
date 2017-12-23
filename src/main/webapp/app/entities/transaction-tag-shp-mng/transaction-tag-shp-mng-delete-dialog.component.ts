import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TransactionTagShpMng } from './transaction-tag-shp-mng.model';
import { TransactionTagShpMngPopupService } from './transaction-tag-shp-mng-popup.service';
import { TransactionTagShpMngService } from './transaction-tag-shp-mng.service';

@Component({
    selector: 'jhi-transaction-tag-shp-mng-delete-dialog',
    templateUrl: './transaction-tag-shp-mng-delete-dialog.component.html'
})
export class TransactionTagShpMngDeleteDialogComponent {

    transactionTag: TransactionTagShpMng;

    constructor(
        private transactionTagService: TransactionTagShpMngService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transactionTagService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'transactionTagListModification',
                content: 'Deleted an transactionTag'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transaction-tag-shp-mng-delete-popup',
    template: ''
})
export class TransactionTagShpMngDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transactionTagPopupService: TransactionTagShpMngPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.transactionTagPopupService
                .open(TransactionTagShpMngDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
