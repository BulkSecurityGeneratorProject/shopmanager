import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopManagerSharedModule } from '../../shared';
import { ShopManagerAdminModule } from '../../admin/admin.module';
import {
    TransactionShpMngService,
    TransactionShpMngPopupService,
    TransactionShpMngComponent,
    TransactionShpMngDetailComponent,
    TransactionShpMngDialogComponent,
    TransactionShpMngPopupComponent,
    TransactionShpMngDeletePopupComponent,
    TransactionShpMngDeleteDialogComponent,
    transactionRoute,
    transactionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...transactionRoute,
    ...transactionPopupRoute,
];

@NgModule({
    imports: [
        ShopManagerSharedModule,
        ShopManagerAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TransactionShpMngComponent,
        TransactionShpMngDetailComponent,
        TransactionShpMngDialogComponent,
        TransactionShpMngDeleteDialogComponent,
        TransactionShpMngPopupComponent,
        TransactionShpMngDeletePopupComponent,
    ],
    entryComponents: [
        TransactionShpMngComponent,
        TransactionShpMngDialogComponent,
        TransactionShpMngPopupComponent,
        TransactionShpMngDeleteDialogComponent,
        TransactionShpMngDeletePopupComponent,
    ],
    providers: [
        TransactionShpMngService,
        TransactionShpMngPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShopManagerTransactionShpMngModule {}
