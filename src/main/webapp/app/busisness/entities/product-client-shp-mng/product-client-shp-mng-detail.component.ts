import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ProductClientShpMng } from './product-client-shp-mng.model';
import { ProductClientShpMngService } from './product-client-shp-mng.service';
import {ProductProfitClientShpMng} from './product-profit-client-shp-mng.model';

@Component({
    selector: 'jhi-product-client-shp-mng-detail',
    templateUrl: './product-client-shp-mng-detail.component.html'
})
export class ProductClientShpMngDetailComponent implements OnInit, OnDestroy {

    product: ProductClientShpMng;
    productProfit: ProductProfitClientShpMng;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private productService: ProductClientShpMngService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProducts();
    }

    computeProfit() {
        this.productService.getProductProfit(this.productProfit.productId, this.productProfit.from).subscribe( (productProfit) => {
            this.productProfit = productProfit;
        });
    }

    load(id) {
        this.productService.find(id).subscribe((product) => {
            this.product = product;
            this.productProfit = new ProductProfitClientShpMng(-1, new Date(0), this.product.id);
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProducts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'productListModification',
            (response) => this.load(this.product.id)
        );
    }
}
