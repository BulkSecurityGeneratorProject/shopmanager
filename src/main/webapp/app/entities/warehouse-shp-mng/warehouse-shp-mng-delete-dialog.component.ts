import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { WarehouseShpMng } from './warehouse-shp-mng.model';
import { WarehouseShpMngPopupService } from './warehouse-shp-mng-popup.service';
import { WarehouseShpMngService } from './warehouse-shp-mng.service';

@Component({
    selector: 'jhi-warehouse-shp-mng-delete-dialog',
    templateUrl: './warehouse-shp-mng-delete-dialog.component.html'
})
export class WarehouseShpMngDeleteDialogComponent {

    warehouse: WarehouseShpMng;

    constructor(
        private warehouseService: WarehouseShpMngService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.warehouseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'warehouseListModification',
                content: 'Deleted an warehouse'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-warehouse-shp-mng-delete-popup',
    template: ''
})
export class WarehouseShpMngDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private warehousePopupService: WarehouseShpMngPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.warehousePopupService
                .open(WarehouseShpMngDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
