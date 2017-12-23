import { BaseEntity } from './../../shared';

export class WarehouseShpMng implements BaseEntity {
    constructor(
        public id?: number,
        public amount?: number,
        public stays?: number,
        public modified?: any,
        public productId?: number,
    ) {
    }
}
