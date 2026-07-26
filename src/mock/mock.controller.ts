import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.mockService.findOne(id)
    }

    @Get('')
    findAll(){
        return this.mockService.findAll()
    }
}
