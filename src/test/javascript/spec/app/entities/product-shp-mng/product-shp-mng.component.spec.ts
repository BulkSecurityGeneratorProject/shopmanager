/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { ShopManagerTestModule } from '../../../test.module';
import { ProductShpMngComponent } from '../../../../../../main/webapp/app/entities/product-shp-mng/product-shp-mng.component';
import { ProductShpMngService } from '../../../../../../main/webapp/app/entities/product-shp-mng/product-shp-mng.service';
import { ProductShpMng } from '../../../../../../main/webapp/app/entities/product-shp-mng/product-shp-mng.model';

describe('Component Tests', () => {

    describe('ProductShpMng Management Component', () => {
        let comp: ProductShpMngComponent;
        let fixture: ComponentFixture<ProductShpMngComponent>;
        let service: ProductShpMngService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopManagerTestModule],
                declarations: [ProductShpMngComponent],
                providers: [
                    ProductShpMngService
                ]
            })
            .overrideTemplate(ProductShpMngComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductShpMngComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductShpMngService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ProductShpMng(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.products[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
