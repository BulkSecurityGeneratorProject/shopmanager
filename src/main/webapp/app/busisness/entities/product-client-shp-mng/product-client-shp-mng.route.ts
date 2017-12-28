import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../../shared';
import { ProductClientShpMngComponent } from './product-client-shp-mng.component';
import { ProductClientShpMngDetailComponent } from './product-client-shp-mng-detail.component';
import { ProductClientShpMngPopupComponent } from './product-client-shp-mng-dialog.component';
import { ProductClientShpMngDeletePopupComponent } from './product-client-shp-mng-delete-dialog.component';

@Injectable()
export class ProductClientShpMngResolvePagingParams implements Resolve<any> {

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

export const productClientRoute: Routes = [
    {
        path: 'product-client-shp-mng',
        component: ProductClientShpMngComponent,
        resolve: {
            'pagingParams': ProductClientShpMngResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopManagerApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product-client-shp-mng/:id',
        component: ProductClientShpMngDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopManagerApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productClientPopupRoute: Routes = [
    {
        path: 'product-client-shp-mng-new',
        component: ProductClientShpMngPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopManagerApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-client-shp-mng/:id/edit',
        component: ProductClientShpMngPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopManagerApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-client-shp-mng/:id/delete',
        component: ProductClientShpMngDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopManagerApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
