/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { ShopManagerTestModule } from '../../../test.module';
import { TransactionTagShpMngDetailComponent } from '../../../../../../main/webapp/app/entities/transaction-tag-shp-mng/transaction-tag-shp-mng-detail.component';
import { TransactionTagShpMngService } from '../../../../../../main/webapp/app/entities/transaction-tag-shp-mng/transaction-tag-shp-mng.service';
import { TransactionTagShpMng } from '../../../../../../main/webapp/app/entities/transaction-tag-shp-mng/transaction-tag-shp-mng.model';

describe('Component Tests', () => {

    describe('TransactionTagShpMng Management Detail Component', () => {
        let comp: TransactionTagShpMngDetailComponent;
        let fixture: ComponentFixture<TransactionTagShpMngDetailComponent>;
        let service: TransactionTagShpMngService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopManagerTestModule],
                declarations: [TransactionTagShpMngDetailComponent],
                providers: [
                    TransactionTagShpMngService
                ]
            })
            .overrideTemplate(TransactionTagShpMngDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionTagShpMngDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionTagShpMngService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TransactionTagShpMng(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.transactionTag).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
