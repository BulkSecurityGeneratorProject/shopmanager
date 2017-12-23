import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopManagerSharedModule } from '../../shared';
import {
    ProductShpMngService,
    ProductShpMngPopupService,
    ProductShpMngComponent,
    ProductShpMngDetailComponent,
    ProductShpMngDialogComponent,
    ProductShpMngPopupComponent,
    ProductShpMngDeletePopupComponent,
    ProductShpMngDeleteDialogComponent,
    productRoute,
    productPopupRoute,
    ProductShpMngResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...productRoute,
    ...productPopupRoute,
];

@NgModule({
    imports: [
        ShopManagerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductShpMngComponent,
        ProductShpMngDetailComponent,
        ProductShpMngDialogComponent,
        ProductShpMngDeleteDialogComponent,
        ProductShpMngPopupComponent,
        ProductShpMngDeletePopupComponent,
    ],
    entryComponents: [
        ProductShpMngComponent,
        ProductShpMngDialogComponent,
        ProductShpMngPopupComponent,
        ProductShpMngDeleteDialogComponent,
        ProductShpMngDeletePopupComponent,
    ],
    providers: [
        ProductShpMngService,
        ProductShpMngPopupService,
        ProductShpMngResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShopManagerProductShpMngModule {}
