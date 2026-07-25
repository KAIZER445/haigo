import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CoreModule, ConfigModule.forRoot({
    isGlobal: true,
  }), DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
