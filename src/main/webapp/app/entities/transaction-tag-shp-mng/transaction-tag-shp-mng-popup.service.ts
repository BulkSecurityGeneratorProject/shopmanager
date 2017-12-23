import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TransactionTagShpMng } from './transaction-tag-shp-mng.model';
import { TransactionTagShpMngService } from './transaction-tag-shp-mng.service';

@Injectable()
export class TransactionTagShpMngPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private transactionTagService: TransactionTagShpMngService

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
                this.transactionTagService.find(id).subscribe((transactionTag) => {
                    transactionTag.modified = this.datePipe
                        .transform(transactionTag.modified, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.transactionTagModalRef(component, transactionTag);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.transactionTagModalRef(component, new TransactionTagShpMng());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    transactionTagModalRef(component: Component, transactionTag: TransactionTagShpMng): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.transactionTag = transactionTag;
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
