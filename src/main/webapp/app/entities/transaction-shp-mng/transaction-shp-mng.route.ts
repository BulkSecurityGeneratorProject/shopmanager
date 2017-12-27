import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TransactionShpMngComponent } from './transaction-shp-mng.component';
import { TransactionShpMngDetailComponent } from './transaction-shp-mng-detail.component';
import { TransactionShpMngPopupComponent } from './transaction-shp-mng-dialog.component';
import { TransactionShpMngDeletePopupComponent } from './transaction-shp-mng-delete-dialog.component';

export const transactionRoute: Routes = [
    {
        path: 'transaction-shp-mng',
        component: TransactionShpMngComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'shopManagerApp.transaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'transaction-shp-mng/:id',
        component: TransactionShpMngDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'shopManagerApp.transaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transactionPopupRoute: Routes = [
    {
        path: 'transaction-shp-mng-new',
        component: TransactionShpMngPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'shopManagerApp.transaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transaction-shp-mng/:id/edit',
        component: TransactionShpMngPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'shopManagerApp.transaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transaction-shp-mng/:id/delete',
        component: TransactionShpMngDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'shopManagerApp.transaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
