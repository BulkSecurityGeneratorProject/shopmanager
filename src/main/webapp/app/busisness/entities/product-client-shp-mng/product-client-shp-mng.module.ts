import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopManagerSharedModule } from '../../../shared';
import { ShopManagerAdminModule } from '../../../admin/admin.module';
import {
    ProductClientShpMngService,
    ProductClientShpMngPopupService,
    ProductClientShpMngComponent,
    ProductClientShpMngDetailComponent,
    ProductClientShpMngDialogComponent,
    ProductClientShpMngPopupComponent,
    ProductClientShpMngDeletePopupComponent,
    ProductClientShpMngDeleteDialogComponent,
    productClientRoute,
    productClientPopupRoute,
    ProductClientShpMngResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...productClientRoute,
    ...productClientPopupRoute,
];

@NgModule({
    imports: [
        ShopManagerSharedModule,
        ShopManagerAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductClientShpMngComponent,
        ProductClientShpMngDetailComponent,
        ProductClientShpMngDialogComponent,
        ProductClientShpMngDeleteDialogComponent,
        ProductClientShpMngPopupComponent,
        ProductClientShpMngDeletePopupComponent,
    ],
    entryComponents: [
        ProductClientShpMngComponent,
        ProductClientShpMngDialogComponent,
        ProductClientShpMngPopupComponent,
        ProductClientShpMngDeleteDialogComponent,
        ProductClientShpMngDeletePopupComponent,
    ],
    providers: [
        ProductClientShpMngService,
        ProductClientShpMngPopupService,
        ProductClientShpMngResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShopManagerProductClientShpMngModule {}
