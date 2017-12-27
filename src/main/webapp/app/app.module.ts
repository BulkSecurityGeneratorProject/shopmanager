import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { ShopManagerSharedModule, UserRouteAccessService } from './shared';
import { ShopManagerAppRoutingModule} from './app-routing.module';
import { ShopManagerHomeModule } from './home/home.module';
import { ShopManagerAdminModule } from './admin/admin.module';
import { ShopManagerAccountModule } from './account/account.module';
import { ShopManagerEntityModule } from './entities/entity.module';
import { ShopManagerClientEntityModule } from './busisness/entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        ShopManagerAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        ShopManagerSharedModule,
        ShopManagerHomeModule,
        ShopManagerAdminModule,
        ShopManagerAccountModule,
        ShopManagerEntityModule,
        ShopManagerClientEntityModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class ShopManagerAppModule {}
