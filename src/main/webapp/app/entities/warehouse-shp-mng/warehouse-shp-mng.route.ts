import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { WarehouseShpMngComponent } from './warehouse-shp-mng.component';
import { WarehouseShpMngDetailComponent } from './warehouse-shp-mng-detail.component';
import { WarehouseShpMngPopupComponent } from './warehouse-shp-mng-dialog.component';
import { WarehouseShpMngDeletePopupComponent } from './warehouse-shp-mng-delete-dialog.component';

@Injectable()
export class WarehouseShpMngResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const warehouseRoute: Routes = [
    {
        path: 'warehouse-shp-mng',
        component: WarehouseShpMngComponent,
        resolve: {
            'pagingParams': WarehouseShpMngResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'shopManagerApp.warehouse.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'warehouse-shp-mng/:id',
        component: WarehouseShpMngDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'shopManagerApp.warehouse.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const warehousePopupRoute: Routes = [
    {
        path: 'warehouse-shp-mng-new',
        component: WarehouseShpMngPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'shopManagerApp.warehouse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'warehouse-shp-mng/:id/edit',
        component: WarehouseShpMngPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'shopManagerApp.warehouse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'warehouse-shp-mng/:id/delete',
        component: WarehouseShpMngDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'shopManagerApp.warehouse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
