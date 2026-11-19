import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { CoreService } from './core.service';
import { ShortenUrlDto } from './dto/core.dto';

@Controller()
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  @Post('shorten')
  shorten(@Body() dto: ShortenUrlDto) {
    return this.coreService.shortenUrl(dto);
  }

  @Get('urls')
  findAll() {
    return this.coreService.getAllUrls();
  }

  @Get(':shortCode')
  @Redirect()
  async redirectToOriginalUrl(@Param('shortCode') shortCode: string) {
    const record = await this.coreService.getOriginalUrl(shortCode);
    if (!record) {
      throw new NotFoundException('URL not found');
    }
    return { url: record.originalUrl, statusCode: 302 };
  }
}
