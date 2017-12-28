import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TransactionClientShpMng } from './transaction-client-shp-mng.model';
import { TransactionClientShpMngPopupService } from './transaction-client-shp-mng-popup.service';
import { TransactionClientShpMngService } from './transaction-client-shp-mng.service';

@Component({
    selector: 'jhi-transaction-shp-mng-delete-dialog',
    templateUrl: './transaction-client-shp-mng-delete-dialog.component.html'
})
export class TransactionClientShpMngDeleteDialogComponent {

    transaction: TransactionClientShpMng;

    constructor(
        private transactionService: TransactionClientShpMngService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transactionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'transactionListModification',
                content: 'Deleted an transaction'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transaction-shp-mng-delete-popup',
    template: ''
})
export class TransactionShpMngDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transactionPopupService: TransactionClientShpMngPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.transactionPopupService
                .open(TransactionClientShpMngDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
