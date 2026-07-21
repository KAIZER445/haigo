import { Injectable } from '@nestjs/common';
import { customAlphabet } from 'nanoid';


@Injectable()
export class CoreService {
    private readonly generateId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 8);
    urlShortner(baseApp: string): string {
        const newUrl = baseApp + this.generateId()
        return (newUrl + "")
    }
}
