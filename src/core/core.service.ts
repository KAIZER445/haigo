import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { customAlphabet } from 'nanoid';
import { PrismaService } from '../prisma/prisma.service';
import { ShortenUrlDto } from './dto/core.dto';

const generateNanoId = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  8,
);

const RESERVED_WORDS = new Set(['urls', 'shorten']);

@Injectable()
export class CoreService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  private getBaseUrl(): string {
    const base =
      this.configService.get<string>('BASE_APP') || 'http://localhost:3000';
    return base.replace(/\/+$/, '');
  }

  async shortenUrl(dto: ShortenUrlDto) {
    const targetUrl = (dto.originalUrl || dto.url)?.trim();

    if (!targetUrl) {
      throw new BadRequestException('originalUrl or url is required');
    }

    // Check if the URL was already shortened
    const existing = await this.prismaService.core.findUnique({
      where: { originalUrl: targetUrl },
    });

    const baseUrl = this.getBaseUrl();

    if (existing) {
      return {
        id: existing.id,
        originalUrl: existing.originalUrl,
        shortCode: existing.shortCode,
        shortUrl: `${baseUrl}/${existing.shortCode}`,
        activeStatus: existing.activeStatus,
        createdAt: existing.createdAt,
      };
    }

    // Generate unique short code
    let shortCode = generateNanoId();
    while (RESERVED_WORDS.has(shortCode)) {
      shortCode = generateNanoId();
    }

    // Ensure no collision in database
    let collision = await this.prismaService.core.findUnique({
      where: { shortCode },
    });
    while (collision) {
      shortCode = generateNanoId();
      collision = await this.prismaService.core.findUnique({
        where: { shortCode },
      });
    }

    const created = await this.prismaService.core.create({
      data: {
        originalUrl: targetUrl,
        shortCode,
        activeStatus: true,
      },
    });

    return {
      id: created.id,
      originalUrl: created.originalUrl,
      shortCode: created.shortCode,
      shortUrl: `${baseUrl}/${created.shortCode}`,
      activeStatus: created.activeStatus,
      createdAt: created.createdAt,
    };
  }

  async getAllUrls() {
    const baseUrl = this.getBaseUrl();
    const urls = await this.prismaService.core.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return urls.map((item) => ({
      id: item.id,
      originalUrl: item.originalUrl,
      shortCode: item.shortCode,
      shortUrl: `${baseUrl}/${item.shortCode}`,
      activeStatus: item.activeStatus,
      createdAt: item.createdAt,
    }));
  }

  async getOriginalUrl(shortCode: string) {
    return this.prismaService.core.findFirst({
      where: {
        shortCode,
        activeStatus: true,
      },
    });
  }
}
