/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ShopManagerTestModule } from '../../../test.module';
import { TransactionShpMngDialogComponent } from '../../../../../../main/webapp/app/entities/transaction-shp-mng/transaction-shp-mng-dialog.component';
import { TransactionShpMngService } from '../../../../../../main/webapp/app/entities/transaction-shp-mng/transaction-shp-mng.service';
import { TransactionShpMng } from '../../../../../../main/webapp/app/entities/transaction-shp-mng/transaction-shp-mng.model';
import { ProductShpMngService } from '../../../../../../main/webapp/app/entities/product-shp-mng';

describe('Component Tests', () => {

    describe('TransactionShpMng Management Dialog Component', () => {
        let comp: TransactionShpMngDialogComponent;
        let fixture: ComponentFixture<TransactionShpMngDialogComponent>;
        let service: TransactionShpMngService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopManagerTestModule],
                declarations: [TransactionShpMngDialogComponent],
                providers: [
                    ProductShpMngService,
                    TransactionShpMngService
                ]
            })
            .overrideTemplate(TransactionShpMngDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionShpMngDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionShpMngService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TransactionShpMng(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.transaction = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'transactionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TransactionShpMng();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.transaction = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'transactionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
