import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/browser';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MockService {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    create(createTestDto: Prisma.TestCreateInput){
        return this.prismaService.test.create({ data: createTestDto })
    }
}
