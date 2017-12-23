import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { WarehouseShpMng } from './warehouse-shp-mng.model';
import { WarehouseShpMngService } from './warehouse-shp-mng.service';

@Component({
    selector: 'jhi-warehouse-shp-mng-detail',
    templateUrl: './warehouse-shp-mng-detail.component.html'
})
export class WarehouseShpMngDetailComponent implements OnInit, OnDestroy {

    warehouse: WarehouseShpMng;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private warehouseService: WarehouseShpMngService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInWarehouses();
    }

    load(id) {
        this.warehouseService.find(id).subscribe((warehouse) => {
            this.warehouse = warehouse;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInWarehouses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'warehouseListModification',
            (response) => this.load(this.warehouse.id)
        );
    }
}
