/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ShopManagerTestModule } from '../../../test.module';
import { WarehouseShpMngDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/warehouse-shp-mng/warehouse-shp-mng-delete-dialog.component';
import { WarehouseShpMngService } from '../../../../../../main/webapp/app/entities/warehouse-shp-mng/warehouse-shp-mng.service';

describe('Component Tests', () => {

    describe('WarehouseShpMng Management Delete Component', () => {
        let comp: WarehouseShpMngDeleteDialogComponent;
        let fixture: ComponentFixture<WarehouseShpMngDeleteDialogComponent>;
        let service: WarehouseShpMngService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopManagerTestModule],
                declarations: [WarehouseShpMngDeleteDialogComponent],
                providers: [
                    WarehouseShpMngService
                ]
            })
            .overrideTemplate(WarehouseShpMngDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WarehouseShpMngDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseShpMngService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
