import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { TransactionClientShpMngComponent } from './transaction-client-shp-mng.component';
import { TransactionClientShpMngDetailComponent } from './transaction-client-shp-mng-detail.component';
import { TransactionShpMngPopupComponent } from './transaction-client-shp-mng-dialog.component';
import { TransactionShpMngDeletePopupComponent } from './transaction-client-shp-mng-delete-dialog.component';

export const transactionClientRoute: Routes = [
    {
        path: 'transaction-client-shp-mng',
        component: TransactionClientShpMngComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopManagerApp.transaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'transaction-client-shp-mng/:id',
        component: TransactionClientShpMngDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopManagerApp.transaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transactionClientPopupRoute: Routes = [
    {
        path: 'transaction-client-shp-mng-new',
        component: TransactionShpMngPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopManagerApp.transaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transaction-client-shp-mng/:id/edit',
        component: TransactionShpMngPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopManagerApp.transaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transaction-client-shp-mng/:id/delete',
        component: TransactionShpMngDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopManagerApp.transaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
