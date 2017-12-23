/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ShopManagerTestModule } from '../../../test.module';
import { ProductShpMngDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/product-shp-mng/product-shp-mng-delete-dialog.component';
import { ProductShpMngService } from '../../../../../../main/webapp/app/entities/product-shp-mng/product-shp-mng.service';

describe('Component Tests', () => {

    describe('ProductShpMng Management Delete Component', () => {
        let comp: ProductShpMngDeleteDialogComponent;
        let fixture: ComponentFixture<ProductShpMngDeleteDialogComponent>;
        let service: ProductShpMngService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopManagerTestModule],
                declarations: [ProductShpMngDeleteDialogComponent],
                providers: [
                    ProductShpMngService
                ]
            })
            .overrideTemplate(ProductShpMngDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductShpMngDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductShpMngService);
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
