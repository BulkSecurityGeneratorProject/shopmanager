import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TransactionTagShpMng } from './transaction-tag-shp-mng.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TransactionTagShpMngService {

    private resourceUrl = SERVER_API_URL + 'api/transaction-tags';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(transactionTag: TransactionTagShpMng): Observable<TransactionTagShpMng> {
        const copy = this.convert(transactionTag);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(transactionTag: TransactionTagShpMng): Observable<TransactionTagShpMng> {
        const copy = this.convert(transactionTag);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TransactionTagShpMng> {
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

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to TransactionTagShpMng.
     */
    private convertItemFromServer(json: any): TransactionTagShpMng {
        const entity: TransactionTagShpMng = Object.assign(new TransactionTagShpMng(), json);
        entity.modified = this.dateUtils
            .convertDateTimeFromServer(json.modified);
        return entity;
    }

    /**
     * Convert a TransactionTagShpMng to a JSON which can be sent to the server.
     */
    private convert(transactionTag: TransactionTagShpMng): TransactionTagShpMng {
        const copy: TransactionTagShpMng = Object.assign({}, transactionTag);

        copy.modified = this.dateUtils.toDate(transactionTag.modified);
        return copy;
    }
}
