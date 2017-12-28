import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductClientShpMng } from './product-client-shp-mng.model';
import { ProductClientShpMngPopupService } from './product-client-shp-mng-popup.service';
import { ProductClientShpMngService } from './product-client-shp-mng.service';

@Component({
    selector: 'jhi-product-client-shp-mng-delete-dialog',
    templateUrl: './product-client-shp-mng-delete-dialog.component.html'
})
export class ProductClientShpMngDeleteDialogComponent {

    product: ProductClientShpMng;

    constructor(
        private productService: ProductClientShpMngService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'productListModification',
                content: 'Deleted an product'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-client-shp-mng-delete-popup',
    template: ''
})
export class ProductClientShpMngDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productPopupService: ProductClientShpMngPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.productPopupService
                .open(ProductClientShpMngDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
