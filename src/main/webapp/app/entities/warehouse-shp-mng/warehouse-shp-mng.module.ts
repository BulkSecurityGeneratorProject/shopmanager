import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopManagerSharedModule } from '../../shared';
import {
    WarehouseShpMngService,
    WarehouseShpMngPopupService,
    WarehouseShpMngComponent,
    WarehouseShpMngDetailComponent,
    WarehouseShpMngDialogComponent,
    WarehouseShpMngPopupComponent,
    WarehouseShpMngDeletePopupComponent,
    WarehouseShpMngDeleteDialogComponent,
    warehouseRoute,
    warehousePopupRoute,
    WarehouseShpMngResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...warehouseRoute,
    ...warehousePopupRoute,
];

@NgModule({
    imports: [
        ShopManagerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WarehouseShpMngComponent,
        WarehouseShpMngDetailComponent,
        WarehouseShpMngDialogComponent,
        WarehouseShpMngDeleteDialogComponent,
        WarehouseShpMngPopupComponent,
        WarehouseShpMngDeletePopupComponent,
    ],
    entryComponents: [
        WarehouseShpMngComponent,
        WarehouseShpMngDialogComponent,
        WarehouseShpMngPopupComponent,
        WarehouseShpMngDeleteDialogComponent,
        WarehouseShpMngDeletePopupComponent,
    ],
    providers: [
        WarehouseShpMngService,
        WarehouseShpMngPopupService,
        WarehouseShpMngResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShopManagerWarehouseShpMngModule {}
