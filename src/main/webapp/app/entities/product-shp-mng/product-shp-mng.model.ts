import { BaseEntity } from './../../shared';

export class ProductShpMng implements BaseEntity {
    constructor(
        public id?: number,
        public label?: string,
        public buyingPrice?: number,
        public amount?: number,
        public stays?: number,
        public modified?: any,
        public products?: BaseEntity[],
        public userId?: number,
    ) {
    }
}
