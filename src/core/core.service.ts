import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { customAlphabet } from 'nanoid';
import { PrismaService } from 'src/prisma/prisma.service';
import { CoreInputDto } from './dto/core.dto';


@Injectable()
export class CoreService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService
    ) { }

    async urlShortner(originalUrl: CoreInputDto) {
        const baseApp = this.configService.get<string>('BASE_APP')
        if (!baseApp) {
            return "base app failed"
        }
        const generateId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 8);
        const newUrl = baseApp + generateId()
        return await this.prismaService.core.create({
            data: {
                ...originalUrl,
                shortenedUrl: newUrl
            }
        })
    }

    async getAllUrls() {
        return await this.prismaService.core.findMany({})
    }

    redirectToOriginalUrl(shortenedUrl: string) {
        const baseApp = this.configService.get<string>('BASE_APP')
        return this.prismaService.core.findUnique({
            where: { shortenedUrl: baseApp + shortenedUrl }
        })
    }
}
