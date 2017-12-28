import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopManagerSharedModule } from '../../../shared';
import { ShopManagerAdminModule } from '../../../admin/admin.module';
import {
    TransactionClientShpMngService,
    TransactionClientShpMngPopupService,
    TransactionClientShpMngComponent,
    TransactionClientShpMngDetailComponent,
    TransactionClientShpMngDialogComponent,
    TransactionShpMngPopupComponent,
    TransactionShpMngDeletePopupComponent,
    TransactionClientShpMngDeleteDialogComponent,
    transactionClientRoute,
    transactionClientPopupRoute,
} from './';

const ENTITY_STATES = [
    ...transactionClientRoute,
    ...transactionClientPopupRoute,
];

@NgModule({
    imports: [
        ShopManagerSharedModule,
        ShopManagerAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TransactionClientShpMngComponent,
        TransactionClientShpMngDetailComponent,
        TransactionClientShpMngDialogComponent,
        TransactionClientShpMngDeleteDialogComponent,
        TransactionShpMngPopupComponent,
        TransactionShpMngDeletePopupComponent,
    ],
    entryComponents: [
        TransactionClientShpMngComponent,
        TransactionClientShpMngDialogComponent,
        TransactionShpMngPopupComponent,
        TransactionClientShpMngDeleteDialogComponent,
        TransactionShpMngDeletePopupComponent,
    ],
    providers: [
        TransactionClientShpMngService,
        TransactionClientShpMngPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShopManagerTransactionClientShpMngModule {}
