/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { ShopManagerTestModule } from '../../../test.module';
import { WarehouseShpMngDetailComponent } from '../../../../../../main/webapp/app/entities/warehouse-shp-mng/warehouse-shp-mng-detail.component';
import { WarehouseShpMngService } from '../../../../../../main/webapp/app/entities/warehouse-shp-mng/warehouse-shp-mng.service';
import { WarehouseShpMng } from '../../../../../../main/webapp/app/entities/warehouse-shp-mng/warehouse-shp-mng.model';

describe('Component Tests', () => {

    describe('WarehouseShpMng Management Detail Component', () => {
        let comp: WarehouseShpMngDetailComponent;
        let fixture: ComponentFixture<WarehouseShpMngDetailComponent>;
        let service: WarehouseShpMngService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopManagerTestModule],
                declarations: [WarehouseShpMngDetailComponent],
                providers: [
                    WarehouseShpMngService
                ]
            })
            .overrideTemplate(WarehouseShpMngDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WarehouseShpMngDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseShpMngService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new WarehouseShpMng(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.warehouse).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
