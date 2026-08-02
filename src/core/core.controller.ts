import { Body, Controller, Get, NotFoundException, Param, Post, Redirect, Res } from '@nestjs/common';
import { CoreService } from './core.service';
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

    @Get(':shortCode')
    @Redirect()
    async redirectToOriginalUrl(@Param('shortCode') shortCode: string){
        const url = await this.coreService.redirectToOriginalUrl(shortCode)
        if (!url){
            throw new NotFoundException('URL not found');
        }
        return {url: url.originalUrl, statusCode: 302}
    }
}
