/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ShopManagerTestModule } from '../../../test.module';
import { TransactionShpMngDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/transaction-shp-mng/transaction-shp-mng-delete-dialog.component';
import { TransactionShpMngService } from '../../../../../../main/webapp/app/entities/transaction-shp-mng/transaction-shp-mng.service';

describe('Component Tests', () => {

    describe('TransactionShpMng Management Delete Component', () => {
        let comp: TransactionShpMngDeleteDialogComponent;
        let fixture: ComponentFixture<TransactionShpMngDeleteDialogComponent>;
        let service: TransactionShpMngService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopManagerTestModule],
                declarations: [TransactionShpMngDeleteDialogComponent],
                providers: [
                    TransactionShpMngService
                ]
            })
            .overrideTemplate(TransactionShpMngDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionShpMngDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionShpMngService);
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
