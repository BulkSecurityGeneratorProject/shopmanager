import { BaseEntity } from '../../../shared';

export class ProductClientShpMng implements BaseEntity {
    constructor(
        public id?: number,
        public label?: string,
        public buyingPrice?: number,
        public sellingPrice?: number,
        public amount?: number,
        public stays?: number,
        public modified?: any,
        public transactions?: BaseEntity[],
        public userId?: number,
    ) {
    }
}
