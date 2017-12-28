import { BaseEntity } from '../../../shared';

export const enum TransactionType {
    'DEBIT',
    'INCOME'
}

export class TransactionClientShpMng implements BaseEntity {
    constructor(
        public id?: number,
        public type?: TransactionType,
        public amount?: number,
        public sellingPrice?: number,
        public keywords?: string,
        public description?: string,
        public done?: any,
        public productId?: number,
        public productDesc?: string,
        public userId?: number,
    ) {
    }
}
