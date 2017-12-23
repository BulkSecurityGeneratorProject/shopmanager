import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { WarehouseShpMng } from './warehouse-shp-mng.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class WarehouseShpMngService {

    private resourceUrl = SERVER_API_URL + 'api/warehouses';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(warehouse: WarehouseShpMng): Observable<WarehouseShpMng> {
        const copy = this.convert(warehouse);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(warehouse: WarehouseShpMng): Observable<WarehouseShpMng> {
        const copy = this.convert(warehouse);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<WarehouseShpMng> {
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
     * Convert a returned JSON object to WarehouseShpMng.
     */
    private convertItemFromServer(json: any): WarehouseShpMng {
        const entity: WarehouseShpMng = Object.assign(new WarehouseShpMng(), json);
        entity.modified = this.dateUtils
            .convertLocalDateFromServer(json.modified);
        return entity;
    }

    /**
     * Convert a WarehouseShpMng to a JSON which can be sent to the server.
     */
    private convert(warehouse: WarehouseShpMng): WarehouseShpMng {
        const copy: WarehouseShpMng = Object.assign({}, warehouse);
        copy.modified = this.dateUtils
            .convertLocalDateToServer(warehouse.modified);
        return copy;
    }
}
