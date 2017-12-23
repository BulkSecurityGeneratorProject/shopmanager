/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ShopManagerTestModule } from '../../../test.module';
import { ProductShpMngDialogComponent } from '../../../../../../main/webapp/app/entities/product-shp-mng/product-shp-mng-dialog.component';
import { ProductShpMngService } from '../../../../../../main/webapp/app/entities/product-shp-mng/product-shp-mng.service';
import { ProductShpMng } from '../../../../../../main/webapp/app/entities/product-shp-mng/product-shp-mng.model';

describe('Component Tests', () => {

    describe('ProductShpMng Management Dialog Component', () => {
        let comp: ProductShpMngDialogComponent;
        let fixture: ComponentFixture<ProductShpMngDialogComponent>;
        let service: ProductShpMngService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopManagerTestModule],
                declarations: [ProductShpMngDialogComponent],
                providers: [
                    ProductShpMngService
                ]
            })
            .overrideTemplate(ProductShpMngDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductShpMngDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductShpMngService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProductShpMng(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.product = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'productListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProductShpMng();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.product = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'productListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
