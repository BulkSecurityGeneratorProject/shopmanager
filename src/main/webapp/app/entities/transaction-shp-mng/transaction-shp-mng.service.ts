import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TransactionShpMng } from './transaction-shp-mng.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TransactionShpMngService {

    private resourceUrl = SERVER_API_URL + 'api/transactions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/transactions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(transaction: TransactionShpMng): Observable<TransactionShpMng> {
        const copy = this.convert(transaction);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(transaction: TransactionShpMng): Observable<TransactionShpMng> {
        const copy = this.convert(transaction);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TransactionShpMng> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
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
     * Convert a returned JSON object to TransactionShpMng.
     */
    private convertItemFromServer(json: any): TransactionShpMng {
        const entity: TransactionShpMng = Object.assign(new TransactionShpMng(), json);
        entity.modified = this.dateUtils
            .convertDateTimeFromServer(json.modified);
        return entity;
    }

    /**
     * Convert a TransactionShpMng to a JSON which can be sent to the server.
     */
    private convert(transaction: TransactionShpMng): TransactionShpMng {
        const copy: TransactionShpMng = Object.assign({}, transaction);

        copy.modified = this.dateUtils.toDate(transaction.modified);
        return copy;
    }
}
