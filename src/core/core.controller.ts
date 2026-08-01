import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoreService } from './core.service';
import { ConfigService } from '@nestjs/config';
import { CoreInputDto } from './dto/core.dto';

@Controller('core')
export class CoreController {
    constructor(
        private readonly coreService: CoreService,
    ) { }

    @Post()
    shortner(@Body() originalUrl: CoreInputDto) {
        return this.coreService.urlShortner(originalUrl)
    }

    @Get('/find-all')
    findAll(){
        return this.coreService.getAllUrls()
    }
}
