import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductShpMng } from './product-shp-mng.model';
import { ProductShpMngPopupService } from './product-shp-mng-popup.service';
import { ProductShpMngService } from './product-shp-mng.service';

@Component({
    selector: 'jhi-product-shp-mng-dialog',
    templateUrl: './product-shp-mng-dialog.component.html'
})
export class ProductShpMngDialogComponent implements OnInit {

    product: ProductShpMng;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private productService: ProductShpMngService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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

    private subscribeToSaveResponse(result: Observable<ProductShpMng>) {
        result.subscribe((res: ProductShpMng) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductShpMng) {
        this.eventManager.broadcast({ name: 'productListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-product-shp-mng-popup',
    template: ''
})
export class ProductShpMngPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productPopupService: ProductShpMngPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.productPopupService
                    .open(ProductShpMngDialogComponent as Component, params['id']);
            } else {
                this.productPopupService
                    .open(ProductShpMngDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
