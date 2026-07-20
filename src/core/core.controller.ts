import { Controller, Get, Post } from '@nestjs/common';
import { CoreService } from './core.service';
import { ConfigService } from '@nestjs/config';

@Controller('core')
export class CoreController {
    constructor(
        private readonly coreService: CoreService,
        private configService: ConfigService
    ) { }

    @Get()
    shortner() {
        const baseApp = this.configService.get<string>('BASE_APP')
        if (!baseApp) {
            return "failed"
        }
        return this.coreService.urlShortner(baseApp)
    }
}
