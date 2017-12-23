/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ShopManagerTestModule } from '../../../test.module';
import { TransactionTagShpMngDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/transaction-tag-shp-mng/transaction-tag-shp-mng-delete-dialog.component';
import { TransactionTagShpMngService } from '../../../../../../main/webapp/app/entities/transaction-tag-shp-mng/transaction-tag-shp-mng.service';

describe('Component Tests', () => {

    describe('TransactionTagShpMng Management Delete Component', () => {
        let comp: TransactionTagShpMngDeleteDialogComponent;
        let fixture: ComponentFixture<TransactionTagShpMngDeleteDialogComponent>;
        let service: TransactionTagShpMngService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopManagerTestModule],
                declarations: [TransactionTagShpMngDeleteDialogComponent],
                providers: [
                    TransactionTagShpMngService
                ]
            })
            .overrideTemplate(TransactionTagShpMngDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionTagShpMngDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionTagShpMngService);
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
