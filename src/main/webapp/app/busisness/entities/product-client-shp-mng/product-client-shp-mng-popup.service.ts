import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProductClientShpMng } from './product-client-shp-mng.model';
import { ProductClientShpMngService } from './product-client-shp-mng.service';

@Injectable()
export class ProductClientShpMngPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private productService: ProductClientShpMngService

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
                this.productService.find(id).subscribe((product) => {
                    if (product.modified) {
                        product.modified = {
                            year: product.modified.getFullYear(),
                            month: product.modified.getMonth() + 1,
                            day: product.modified.getDate()
                        };
                    }
                    this.ngbModalRef = this.productModalRef(component, product);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.productModalRef(component, new ProductClientShpMng());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    productModalRef(component: Component, product: ProductClientShpMng): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.product = product;
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
