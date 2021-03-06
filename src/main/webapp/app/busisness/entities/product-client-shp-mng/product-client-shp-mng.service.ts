import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ProductClientShpMng } from './product-client-shp-mng.model';
import { ResponseWrapper, createRequestOption } from '../../../shared';
import {ProductProfitClientShpMng} from './product-profit-client-shp-mng.model';

@Injectable()
export class ProductClientShpMngService {

    private resourceUrl = SERVER_API_URL + 'api/products';
    private resourceUrlProductsUser = SERVER_API_URL + 'api/productsByUser';
    private resourceUrlGetProfit = this.resourceUrlProductsUser + '/profit';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(product: ProductClientShpMng): Observable<ProductClientShpMng> {
        const copy = this.convert(product);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(product: ProductClientShpMng): Observable<ProductClientShpMng> {
        const copy = this.convert(product);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ProductClientShpMng> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrlProductsUser, options)
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
     * Convert a returned JSON object to ProductClientShpMng.
     */
    private convertItemFromServer(json: any): ProductClientShpMng {
        const entity: ProductClientShpMng = Object.assign(new ProductClientShpMng(), json);
        entity.modified = this.dateUtils
            .convertLocalDateFromServer(json.modified);
        return entity;
    }

    /**
     * Convert a returned JSON object to ProductClientShpMng.
     */
    private convertProductProfitFromServer(json: any): ProductProfitClientShpMng {
        const entity: ProductProfitClientShpMng = Object.assign(new ProductProfitClientShpMng(), json);
        entity.from = this.dateUtils
            .convertLocalDateFromServer(json.from);
        return entity;
    }

    /**
     * Convert a ProductClientShpMng to a JSON which can be sent to the server.
     */
    private convert(product: ProductClientShpMng): ProductClientShpMng {
        const copy: ProductClientShpMng = Object.assign({}, product);
        copy.modified = this.dateUtils
            .convertLocalDateToServer(product.modified);
        return copy;
    }

    /**
     * Convert a ProductProfitClientShpMng to a JSON which can be sent to the server.
     */
    private convertProductProfit(productProfit: ProductProfitClientShpMng): ProductProfitClientShpMng {
        const copy: ProductProfitClientShpMng = Object.assign({}, productProfit);
        copy.from = this.dateUtils
            .convertLocalDateToServer(productProfit.from);
        return copy;
    }

    getProductProfit(productId: number, from: any) {
        const copy = this.convertProductProfit(new ProductProfitClientShpMng(-1, from, productId));
        return this.http.post(this.resourceUrlGetProfit, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertProductProfitFromServer(jsonResponse);
        });
    }
}
