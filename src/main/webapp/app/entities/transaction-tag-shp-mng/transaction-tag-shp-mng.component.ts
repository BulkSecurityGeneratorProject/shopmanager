import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TransactionTagShpMng } from './transaction-tag-shp-mng.model';
import { TransactionTagShpMngService } from './transaction-tag-shp-mng.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-transaction-tag-shp-mng',
    templateUrl: './transaction-tag-shp-mng.component.html'
})
export class TransactionTagShpMngComponent implements OnInit, OnDestroy {
transactionTags: TransactionTagShpMng[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private transactionTagService: TransactionTagShpMngService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.transactionTagService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.transactionTags = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.transactionTagService.query().subscribe(
            (res: ResponseWrapper) => {
                this.transactionTags = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTransactionTags();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TransactionTagShpMng) {
        return item.id;
    }
    registerChangeInTransactionTags() {
        this.eventSubscriber = this.eventManager.subscribe('transactionTagListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
