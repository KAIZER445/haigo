import { Body, Controller, Post } from '@nestjs/common';
import { MockService } from './mock.service';
import { Prisma } from 'generated/prisma/browser';

@Controller('mock')
export class MockController {
    constructor(
        private readonly mockService: MockService
    ){}

    @Post()
    create(@Body() createTestDto: Prisma.TestCreateInput){
        return this.mockService.create(createTestDto)
    }
}
