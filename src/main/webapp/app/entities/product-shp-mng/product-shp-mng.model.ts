import { BaseEntity } from './../../shared';

export class ProductShpMng implements BaseEntity {
    constructor(
        public id?: number,
        public label?: string,
        public buyingPrice?: number,
        public modified?: any,
    ) {
    }
}
