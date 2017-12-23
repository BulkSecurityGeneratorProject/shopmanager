import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TransactionTagShpMng } from './transaction-tag-shp-mng.model';
import { TransactionTagShpMngPopupService } from './transaction-tag-shp-mng-popup.service';
import { TransactionTagShpMngService } from './transaction-tag-shp-mng.service';
import { TransactionShpMng, TransactionShpMngService } from '../transaction-shp-mng';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-transaction-tag-shp-mng-dialog',
    templateUrl: './transaction-tag-shp-mng-dialog.component.html'
})
export class TransactionTagShpMngDialogComponent implements OnInit {

    transactionTag: TransactionTagShpMng;
    isSaving: boolean;

    transactions: TransactionShpMng[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private transactionTagService: TransactionTagShpMngService,
        private transactionService: TransactionShpMngService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.transactionService.query()
            .subscribe((res: ResponseWrapper) => { this.transactions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.transactionTag.id !== undefined) {
            this.subscribeToSaveResponse(
                this.transactionTagService.update(this.transactionTag));
        } else {
            this.subscribeToSaveResponse(
                this.transactionTagService.create(this.transactionTag));
        }
    }

    private subscribeToSaveResponse(result: Observable<TransactionTagShpMng>) {
        result.subscribe((res: TransactionTagShpMng) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TransactionTagShpMng) {
        this.eventManager.broadcast({ name: 'transactionTagListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTransactionById(index: number, item: TransactionShpMng) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-transaction-tag-shp-mng-popup',
    template: ''
})
export class TransactionTagShpMngPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transactionTagPopupService: TransactionTagShpMngPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.transactionTagPopupService
                    .open(TransactionTagShpMngDialogComponent as Component, params['id']);
            } else {
                this.transactionTagPopupService
                    .open(TransactionTagShpMngDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
