import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { WarehouseShpMng } from './warehouse-shp-mng.model';
import { WarehouseShpMngPopupService } from './warehouse-shp-mng-popup.service';
import { WarehouseShpMngService } from './warehouse-shp-mng.service';
import { ProductShpMng, ProductShpMngService } from '../product-shp-mng';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-warehouse-shp-mng-dialog',
    templateUrl: './warehouse-shp-mng-dialog.component.html'
})
export class WarehouseShpMngDialogComponent implements OnInit {

    warehouse: WarehouseShpMng;
    isSaving: boolean;

    products: ProductShpMng[];
    modifiedDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private warehouseService: WarehouseShpMngService,
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
        if (this.warehouse.id !== undefined) {
            this.subscribeToSaveResponse(
                this.warehouseService.update(this.warehouse));
        } else {
            this.subscribeToSaveResponse(
                this.warehouseService.create(this.warehouse));
        }
    }

    private subscribeToSaveResponse(result: Observable<WarehouseShpMng>) {
        result.subscribe((res: WarehouseShpMng) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: WarehouseShpMng) {
        this.eventManager.broadcast({ name: 'warehouseListModification', content: 'OK'});
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
    selector: 'jhi-warehouse-shp-mng-popup',
    template: ''
})
export class WarehouseShpMngPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private warehousePopupService: WarehouseShpMngPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.warehousePopupService
                    .open(WarehouseShpMngDialogComponent as Component, params['id']);
            } else {
                this.warehousePopupService
                    .open(WarehouseShpMngDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
