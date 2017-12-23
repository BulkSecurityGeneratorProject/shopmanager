import { BaseEntity } from './../../shared';

export class TransactionTagShpMng implements BaseEntity {
    constructor(
        public id?: number,
        public value?: string,
        public modified?: any,
        public transactionId?: number,
    ) {
    }
}
