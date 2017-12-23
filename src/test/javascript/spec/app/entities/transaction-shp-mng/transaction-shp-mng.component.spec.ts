/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { ShopManagerTestModule } from '../../../test.module';
import { TransactionShpMngComponent } from '../../../../../../main/webapp/app/entities/transaction-shp-mng/transaction-shp-mng.component';
import { TransactionShpMngService } from '../../../../../../main/webapp/app/entities/transaction-shp-mng/transaction-shp-mng.service';
import { TransactionShpMng } from '../../../../../../main/webapp/app/entities/transaction-shp-mng/transaction-shp-mng.model';

describe('Component Tests', () => {

    describe('TransactionShpMng Management Component', () => {
        let comp: TransactionShpMngComponent;
        let fixture: ComponentFixture<TransactionShpMngComponent>;
        let service: TransactionShpMngService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopManagerTestModule],
                declarations: [TransactionShpMngComponent],
                providers: [
                    TransactionShpMngService
                ]
            })
            .overrideTemplate(TransactionShpMngComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionShpMngComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionShpMngService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TransactionShpMng(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.transactions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
