/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ShopManagerTestModule } from '../../../test.module';
import { TransactionTagShpMngDialogComponent } from '../../../../../../main/webapp/app/entities/transaction-tag-shp-mng/transaction-tag-shp-mng-dialog.component';
import { TransactionTagShpMngService } from '../../../../../../main/webapp/app/entities/transaction-tag-shp-mng/transaction-tag-shp-mng.service';
import { TransactionTagShpMng } from '../../../../../../main/webapp/app/entities/transaction-tag-shp-mng/transaction-tag-shp-mng.model';
import { TransactionShpMngService } from '../../../../../../main/webapp/app/entities/transaction-shp-mng';

describe('Component Tests', () => {

    describe('TransactionTagShpMng Management Dialog Component', () => {
        let comp: TransactionTagShpMngDialogComponent;
        let fixture: ComponentFixture<TransactionTagShpMngDialogComponent>;
        let service: TransactionTagShpMngService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopManagerTestModule],
                declarations: [TransactionTagShpMngDialogComponent],
                providers: [
                    TransactionShpMngService,
                    TransactionTagShpMngService
                ]
            })
            .overrideTemplate(TransactionTagShpMngDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionTagShpMngDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionTagShpMngService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TransactionTagShpMng(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.transactionTag = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'transactionTagListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TransactionTagShpMng();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.transactionTag = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'transactionTagListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
