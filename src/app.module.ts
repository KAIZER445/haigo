import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config'
import { MockModule } from './mock/mock.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CoreModule, ConfigModule.forRoot({
    isGlobal: true,
  }), MockModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
