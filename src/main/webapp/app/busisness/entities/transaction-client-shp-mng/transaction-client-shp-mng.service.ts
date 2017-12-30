import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TransactionClientShpMng } from './transaction-client-shp-mng.model';
import { ResponseWrapper, createRequestOption } from '../../../shared';

@Injectable()
export class TransactionClientShpMngService {

    private resourceUrl = SERVER_API_URL + 'api/transactions';
    private resourceUrlTransactionsUser = SERVER_API_URL + 'api/transactionsByUser';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(transaction: TransactionClientShpMng): Observable<TransactionClientShpMng> {
        const copy = this.convert(transaction);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(transaction: TransactionClientShpMng): Observable<TransactionClientShpMng> {
        const copy = this.convert(transaction);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TransactionClientShpMng> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrlTransactionsUser, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to TransactionClientShpMng.
     */
    private convertItemFromServer(json: any): TransactionClientShpMng {
        const entity: TransactionClientShpMng = Object.assign(new TransactionClientShpMng(), json);
        entity.done = this.dateUtils
            .convertLocalDateFromServer(json.done);
        return entity;
    }

    /**
     * Convert a TransactionClientShpMng to a JSON which can be sent to the server.
     */
    private convert(transaction: TransactionClientShpMng): TransactionClientShpMng {
        const copy: TransactionClientShpMng = Object.assign({}, transaction);
        copy.done = this.dateUtils
            .convertLocalDateToServer(transaction.done);
        return copy;
    }
}
