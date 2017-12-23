/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { ShopManagerTestModule } from '../../../test.module';
import { TransactionTagShpMngComponent } from '../../../../../../main/webapp/app/entities/transaction-tag-shp-mng/transaction-tag-shp-mng.component';
import { TransactionTagShpMngService } from '../../../../../../main/webapp/app/entities/transaction-tag-shp-mng/transaction-tag-shp-mng.service';
import { TransactionTagShpMng } from '../../../../../../main/webapp/app/entities/transaction-tag-shp-mng/transaction-tag-shp-mng.model';

describe('Component Tests', () => {

    describe('TransactionTagShpMng Management Component', () => {
        let comp: TransactionTagShpMngComponent;
        let fixture: ComponentFixture<TransactionTagShpMngComponent>;
        let service: TransactionTagShpMngService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopManagerTestModule],
                declarations: [TransactionTagShpMngComponent],
                providers: [
                    TransactionTagShpMngService
                ]
            })
            .overrideTemplate(TransactionTagShpMngComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionTagShpMngComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionTagShpMngService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TransactionTagShpMng(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.transactionTags[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
