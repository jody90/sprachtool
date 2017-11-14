import { environment } from '../../environments/environment.prod';
import { KeyModel } from '../key/key.model';
export class VersionModel {
    constructor(public _id: string, public title: string, public description: string, public environment: Object, public keys: KeyModel [], public createdAt: number) {}
}