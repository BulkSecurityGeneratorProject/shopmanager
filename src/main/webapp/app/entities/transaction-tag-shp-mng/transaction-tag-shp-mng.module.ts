import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopManagerSharedModule } from '../../shared';
import {
    TransactionTagShpMngService,
    TransactionTagShpMngPopupService,
    TransactionTagShpMngComponent,
    TransactionTagShpMngDetailComponent,
    TransactionTagShpMngDialogComponent,
    TransactionTagShpMngPopupComponent,
    TransactionTagShpMngDeletePopupComponent,
    TransactionTagShpMngDeleteDialogComponent,
    transactionTagRoute,
    transactionTagPopupRoute,
} from './';

const ENTITY_STATES = [
    ...transactionTagRoute,
    ...transactionTagPopupRoute,
];

@NgModule({
    imports: [
        ShopManagerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TransactionTagShpMngComponent,
        TransactionTagShpMngDetailComponent,
        TransactionTagShpMngDialogComponent,
        TransactionTagShpMngDeleteDialogComponent,
        TransactionTagShpMngPopupComponent,
        TransactionTagShpMngDeletePopupComponent,
    ],
    entryComponents: [
        TransactionTagShpMngComponent,
        TransactionTagShpMngDialogComponent,
        TransactionTagShpMngPopupComponent,
        TransactionTagShpMngDeleteDialogComponent,
        TransactionTagShpMngDeletePopupComponent,
    ],
    providers: [
        TransactionTagShpMngService,
        TransactionTagShpMngPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShopManagerTransactionTagShpMngModule {}
