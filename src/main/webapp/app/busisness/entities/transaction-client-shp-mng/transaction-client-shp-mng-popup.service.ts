import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TransactionClientShpMng } from './transaction-client-shp-mng.model';
import { TransactionClientShpMngService } from './transaction-client-shp-mng.service';

@Injectable()
export class TransactionClientShpMngPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private transactionService: TransactionClientShpMngService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.transactionService.find(id).subscribe((transaction) => {
                    if (transaction.done) {
                        transaction.done = {
                            year: transaction.done.getFullYear(),
                            month: transaction.done.getMonth() + 1,
                            day: transaction.done.getDate()
                        };
                    }
                    this.ngbModalRef = this.transactionModalRef(component, transaction);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.transactionModalRef(component, new TransactionClientShpMng());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    transactionModalRef(component: Component, transaction: TransactionClientShpMng): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.transaction = transaction;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
