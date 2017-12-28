import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ShopManagerTransactionClientShpMngModule } from './transaction-client-shp-mng/transaction-client-shp-mng.module';
import { ShopManagerProductClientShpMngModule } from './product-client-shp-mng/product-client-shp-mng.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ShopManagerTransactionClientShpMngModule,
        ShopManagerProductClientShpMngModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShopManagerClientEntityModule {}
