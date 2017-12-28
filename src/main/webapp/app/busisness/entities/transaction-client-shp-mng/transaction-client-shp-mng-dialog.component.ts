import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TransactionClientShpMng } from './transaction-client-shp-mng.model';
import { TransactionClientShpMngPopupService } from './transaction-client-shp-mng-popup.service';
import { TransactionClientShpMngService } from './transaction-client-shp-mng.service';
import { ProductClientShpMng, ProductClientShpMngService } from '../product-client-shp-mng';
import { User, UserService } from '../../../shared';
import { ResponseWrapper } from '../../../shared';

@Component({
    selector: 'jhi-transaction-client-shp-mng-dialog',
    templateUrl: './transaction-client-shp-mng-dialog.component.html'
})
export class TransactionClientShpMngDialogComponent implements OnInit {

    transaction: TransactionClientShpMng;
    isSaving: boolean;

    products: ProductClientShpMng[];

    users: User[];
    doneDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private transactionService: TransactionClientShpMngService,
        private productService: ProductClientShpMngService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService.query()
            .subscribe((res: ResponseWrapper) => { this.products = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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

    private subscribeToSaveResponse(result: Observable<TransactionClientShpMng>) {
        result.subscribe((res: TransactionClientShpMng) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TransactionClientShpMng) {
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

    trackProductById(index: number, item: ProductClientShpMng) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
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
        private transactionPopupService: TransactionClientShpMngPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.transactionPopupService
                    .open(TransactionClientShpMngDialogComponent as Component, params['id']);
            } else {
                this.transactionPopupService
                    .open(TransactionClientShpMngDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
