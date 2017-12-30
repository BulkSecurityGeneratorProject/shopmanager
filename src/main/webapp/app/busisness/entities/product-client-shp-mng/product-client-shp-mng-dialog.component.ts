import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductClientShpMng } from './product-client-shp-mng.model';
import { ProductClientShpMngPopupService } from './product-client-shp-mng-popup.service';
import { ProductClientShpMngService } from './product-client-shp-mng.service';
import { User, UserService } from '../../../shared';
import { ResponseWrapper } from '../../../shared';

@Component({
    selector: 'jhi-product-client-shp-mng-dialog',
    templateUrl: './product-client-shp-mng-dialog.component.html'
})
export class ProductClientShpMngDialogComponent implements OnInit {

    product: ProductClientShpMng;
    isSaving: boolean;
    isUpdate: boolean;

    users: User[];
    modifiedDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private productService: ProductClientShpMngService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.isUpdate = this.product.id !== undefined;
        if (!this.isUpdate) {
            this.product.amount = 0;
            this.product.stays = 0;
        }
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.product.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productService.update(this.product));
        } else {
            this.subscribeToSaveResponse(
                this.productService.create(this.product));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProductClientShpMng>) {
        result.subscribe((res: ProductClientShpMng) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductClientShpMng) {
        this.eventManager.broadcast({ name: 'productListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-product-client-shp-mng-popup',
    template: ''
})
export class ProductClientShpMngPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productPopupService: ProductClientShpMngPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.productPopupService
                    .open(ProductClientShpMngDialogComponent as Component, params['id']);
            } else {
                this.productPopupService
                    .open(ProductClientShpMngDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
