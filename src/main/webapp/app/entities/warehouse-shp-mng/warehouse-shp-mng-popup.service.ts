import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { WarehouseShpMng } from './warehouse-shp-mng.model';
import { WarehouseShpMngService } from './warehouse-shp-mng.service';

@Injectable()
export class WarehouseShpMngPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private warehouseService: WarehouseShpMngService

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
                this.warehouseService.find(id).subscribe((warehouse) => {
                    if (warehouse.modified) {
                        warehouse.modified = {
                            year: warehouse.modified.getFullYear(),
                            month: warehouse.modified.getMonth() + 1,
                            day: warehouse.modified.getDate()
                        };
                    }
                    this.ngbModalRef = this.warehouseModalRef(component, warehouse);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.warehouseModalRef(component, new WarehouseShpMng());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    warehouseModalRef(component: Component, warehouse: WarehouseShpMng): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.warehouse = warehouse;
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
