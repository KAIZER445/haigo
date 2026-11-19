import { IsOptional, IsUrl } from 'class-validator';

export class ShortenUrlDto {
  @IsOptional()
  @IsUrl(
    { require_protocol: true },
    {
      message:
        'originalUrl must be a valid URL with protocol (e.g. https://example.com)',
    },
  )
  originalUrl?: string;

  @IsOptional()
  @IsUrl(
    { require_protocol: true },
    {
      message:
        'url must be a valid URL with protocol (e.g. https://example.com)',
    },
  )
  url?: string;
}
