import { BaseEntity } from './../../shared';

export const enum TransactionType {
    'DEBIT',
    'INCOME'
}

export class TransactionShpMng implements BaseEntity {
    constructor(
        public id?: number,
        public type?: TransactionType,
        public amount?: number,
        public modified?: any,
        public tags?: BaseEntity[],
        public productId?: number,
    ) {
    }
}
