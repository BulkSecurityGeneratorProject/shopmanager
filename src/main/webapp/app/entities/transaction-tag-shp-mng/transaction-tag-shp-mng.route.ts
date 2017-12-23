import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TransactionTagShpMngComponent } from './transaction-tag-shp-mng.component';
import { TransactionTagShpMngDetailComponent } from './transaction-tag-shp-mng-detail.component';
import { TransactionTagShpMngPopupComponent } from './transaction-tag-shp-mng-dialog.component';
import { TransactionTagShpMngDeletePopupComponent } from './transaction-tag-shp-mng-delete-dialog.component';

export const transactionTagRoute: Routes = [
    {
        path: 'transaction-tag-shp-mng',
        component: TransactionTagShpMngComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopManagerApp.transactionTag.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'transaction-tag-shp-mng/:id',
        component: TransactionTagShpMngDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopManagerApp.transactionTag.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transactionTagPopupRoute: Routes = [
    {
        path: 'transaction-tag-shp-mng-new',
        component: TransactionTagShpMngPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopManagerApp.transactionTag.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transaction-tag-shp-mng/:id/edit',
        component: TransactionTagShpMngPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopManagerApp.transactionTag.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transaction-tag-shp-mng/:id/delete',
        component: TransactionTagShpMngDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopManagerApp.transactionTag.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
