import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TransactionShpMng } from './transaction-shp-mng.model';
import { TransactionShpMngPopupService } from './transaction-shp-mng-popup.service';
import { TransactionShpMngService } from './transaction-shp-mng.service';
import { ProductShpMng, ProductShpMngService } from '../product-shp-mng';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-transaction-shp-mng-dialog',
    templateUrl: './transaction-shp-mng-dialog.component.html'
})
export class TransactionShpMngDialogComponent implements OnInit {

    transaction: TransactionShpMng;
    isSaving: boolean;

    products: ProductShpMng[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private transactionService: TransactionShpMngService,
        private productService: ProductShpMngService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService.query()
            .subscribe((res: ResponseWrapper) => { this.products = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.transaction.id !== undefined) {
            this.subscribeToSaveResponse(
                this.transactionService.update(this.transaction));
        } else {
            this.subscribeToSaveResponse(
                this.transactionService.create(this.transaction));
        }
    }

    private subscribeToSaveResponse(result: Observable<TransactionShpMng>) {
        result.subscribe((res: TransactionShpMng) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TransactionShpMng) {
        this.eventManager.broadcast({ name: 'transactionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: ProductShpMng) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-transaction-shp-mng-popup',
    template: ''
})
export class TransactionShpMngPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transactionPopupService: TransactionShpMngPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.transactionPopupService
                    .open(TransactionShpMngDialogComponent as Component, params['id']);
            } else {
                this.transactionPopupService
                    .open(TransactionShpMngDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
