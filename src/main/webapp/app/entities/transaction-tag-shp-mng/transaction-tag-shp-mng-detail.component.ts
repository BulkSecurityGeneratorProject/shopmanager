import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { TransactionTagShpMng } from './transaction-tag-shp-mng.model';
import { TransactionTagShpMngService } from './transaction-tag-shp-mng.service';

@Component({
    selector: 'jhi-transaction-tag-shp-mng-detail',
    templateUrl: './transaction-tag-shp-mng-detail.component.html'
})
export class TransactionTagShpMngDetailComponent implements OnInit, OnDestroy {

    transactionTag: TransactionTagShpMng;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private transactionTagService: TransactionTagShpMngService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTransactionTags();
    }

    load(id) {
        this.transactionTagService.find(id).subscribe((transactionTag) => {
            this.transactionTag = transactionTag;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTransactionTags() {
        this.eventSubscriber = this.eventManager.subscribe(
            'transactionTagListModification',
            (response) => this.load(this.transactionTag.id)
        );
    }
}
