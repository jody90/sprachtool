import { Translation } from './translation.model';

export class KeyModel {

    constructor(public key: string, public translations: Translation [], public createdAt: number, public modifiedAt: number) {

    }

}
