/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ShopManagerTestModule } from '../../../test.module';
import { WarehouseShpMngDialogComponent } from '../../../../../../main/webapp/app/entities/warehouse-shp-mng/warehouse-shp-mng-dialog.component';
import { WarehouseShpMngService } from '../../../../../../main/webapp/app/entities/warehouse-shp-mng/warehouse-shp-mng.service';
import { WarehouseShpMng } from '../../../../../../main/webapp/app/entities/warehouse-shp-mng/warehouse-shp-mng.model';
import { ProductShpMngService } from '../../../../../../main/webapp/app/entities/product-shp-mng';

describe('Component Tests', () => {

    describe('WarehouseShpMng Management Dialog Component', () => {
        let comp: WarehouseShpMngDialogComponent;
        let fixture: ComponentFixture<WarehouseShpMngDialogComponent>;
        let service: WarehouseShpMngService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopManagerTestModule],
                declarations: [WarehouseShpMngDialogComponent],
                providers: [
                    ProductShpMngService,
                    WarehouseShpMngService
                ]
            })
            .overrideTemplate(WarehouseShpMngDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WarehouseShpMngDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseShpMngService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WarehouseShpMng(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.warehouse = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'warehouseListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WarehouseShpMng();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.warehouse = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'warehouseListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
