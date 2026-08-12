import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { customAlphabet } from 'nanoid';
import { PrismaService } from 'src/prisma/prisma.service';
import { CoreInputDto } from './dto/core.dto';


@Injectable()
export class CoreService {

    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async urlShortner(originalUrl: CoreInputDto) {
        const generateId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 8);
        const newUrlCode = generateId()
        return await this.prismaService.core.create({
            data: {
                ...originalUrl,
                shortCode: newUrlCode
            }
        })
    }

    async getAllUrls() {
        return await this.prismaService.core.findMany({})
    }

    redirectToOriginalUrl(shortCode) {
        return this.prismaService.core.findUnique({
            where: { shortCode: shortCode }
        })
    }
}
