import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/browser';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MockService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async create(createTestDto: Prisma.TestCreateInput) {
        return await this.prismaService.test.create({ data: createTestDto })
    }

    async findAll() {
        return await this.prismaService.test.findMany({})
    }

    async findOne(id: string) {
        return await this.prismaService.test.findFirst({
            where: {
                id
            }
        })
    }
}
