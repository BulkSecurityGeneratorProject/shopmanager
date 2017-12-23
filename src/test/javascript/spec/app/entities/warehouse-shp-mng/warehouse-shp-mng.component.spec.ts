/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { ShopManagerTestModule } from '../../../test.module';
import { WarehouseShpMngComponent } from '../../../../../../main/webapp/app/entities/warehouse-shp-mng/warehouse-shp-mng.component';
import { WarehouseShpMngService } from '../../../../../../main/webapp/app/entities/warehouse-shp-mng/warehouse-shp-mng.service';
import { WarehouseShpMng } from '../../../../../../main/webapp/app/entities/warehouse-shp-mng/warehouse-shp-mng.model';

describe('Component Tests', () => {

    describe('WarehouseShpMng Management Component', () => {
        let comp: WarehouseShpMngComponent;
        let fixture: ComponentFixture<WarehouseShpMngComponent>;
        let service: WarehouseShpMngService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopManagerTestModule],
                declarations: [WarehouseShpMngComponent],
                providers: [
                    WarehouseShpMngService
                ]
            })
            .overrideTemplate(WarehouseShpMngComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WarehouseShpMngComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseShpMngService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new WarehouseShpMng(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.warehouses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
