/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { ShopManagerTestModule } from '../../../test.module';
import { TransactionShpMngDetailComponent } from '../../../../../../main/webapp/app/entities/transaction-shp-mng/transaction-shp-mng-detail.component';
import { TransactionShpMngService } from '../../../../../../main/webapp/app/entities/transaction-shp-mng/transaction-shp-mng.service';
import { TransactionShpMng } from '../../../../../../main/webapp/app/entities/transaction-shp-mng/transaction-shp-mng.model';

describe('Component Tests', () => {

    describe('TransactionShpMng Management Detail Component', () => {
        let comp: TransactionShpMngDetailComponent;
        let fixture: ComponentFixture<TransactionShpMngDetailComponent>;
        let service: TransactionShpMngService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopManagerTestModule],
                declarations: [TransactionShpMngDetailComponent],
                providers: [
                    TransactionShpMngService
                ]
            })
            .overrideTemplate(TransactionShpMngDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionShpMngDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionShpMngService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TransactionShpMng(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.transaction).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
