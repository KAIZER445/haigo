import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

@Controller('database')
export class DatabaseController extends PrismaClient implements OnModuleInit {
    constructor() {
        super({ adapter });
    }

    async onModuleInit() {
        await this.$connect()
    }

    @Get('nana')
    hello() {
        return "hello"
    }
}