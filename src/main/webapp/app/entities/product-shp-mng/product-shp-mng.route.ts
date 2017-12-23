import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ProductShpMngComponent } from './product-shp-mng.component';
import { ProductShpMngDetailComponent } from './product-shp-mng-detail.component';
import { ProductShpMngPopupComponent } from './product-shp-mng-dialog.component';
import { ProductShpMngDeletePopupComponent } from './product-shp-mng-delete-dialog.component';

@Injectable()
export class ProductShpMngResolvePagingParams implements Resolve<any> {

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

export const productRoute: Routes = [
    {
        path: 'product-shp-mng',
        component: ProductShpMngComponent,
        resolve: {
            'pagingParams': ProductShpMngResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopManagerApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product-shp-mng/:id',
        component: ProductShpMngDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopManagerApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productPopupRoute: Routes = [
    {
        path: 'product-shp-mng-new',
        component: ProductShpMngPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopManagerApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-shp-mng/:id/edit',
        component: ProductShpMngPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopManagerApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-shp-mng/:id/delete',
        component: ProductShpMngDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopManagerApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
