import { IsString, isString } from "class-validator";


export class CoreInputDto {

    @IsString()
    originalUrl!: string 
}