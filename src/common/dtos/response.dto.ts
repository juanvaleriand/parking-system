import { ApiProperty } from "@nestjs/swagger";
import { IsObject } from "class-validator";

export class ResponseDto {
    @IsObject()
    
    @ApiProperty({ isArray: false })
    readonly success: boolean;

    @ApiProperty({ isArray: false })
    readonly message: string;

    constructor(success: boolean, message: string) {
        this.success = success;
        this.message = message;
    }
}