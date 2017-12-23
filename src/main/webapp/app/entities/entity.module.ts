import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ShopManagerTransactionShpMngModule } from './transaction-shp-mng/transaction-shp-mng.module';
import { ShopManagerTransactionTagShpMngModule } from './transaction-tag-shp-mng/transaction-tag-shp-mng.module';
import { ShopManagerProductShpMngModule } from './product-shp-mng/product-shp-mng.module';
import { ShopManagerWarehouseShpMngModule } from './warehouse-shp-mng/warehouse-shp-mng.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ShopManagerTransactionShpMngModule,
        ShopManagerTransactionTagShpMngModule,
        ShopManagerProductShpMngModule,
        ShopManagerWarehouseShpMngModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShopManagerEntityModule {}
