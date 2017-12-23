/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { ShopManagerTestModule } from '../../../test.module';
import { ProductShpMngDetailComponent } from '../../../../../../main/webapp/app/entities/product-shp-mng/product-shp-mng-detail.component';
import { ProductShpMngService } from '../../../../../../main/webapp/app/entities/product-shp-mng/product-shp-mng.service';
import { ProductShpMng } from '../../../../../../main/webapp/app/entities/product-shp-mng/product-shp-mng.model';

describe('Component Tests', () => {

    describe('ProductShpMng Management Detail Component', () => {
        let comp: ProductShpMngDetailComponent;
        let fixture: ComponentFixture<ProductShpMngDetailComponent>;
        let service: ProductShpMngService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopManagerTestModule],
                declarations: [ProductShpMngDetailComponent],
                providers: [
                    ProductShpMngService
                ]
            })
            .overrideTemplate(ProductShpMngDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductShpMngDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductShpMngService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ProductShpMng(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.product).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
