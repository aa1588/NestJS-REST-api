import { IsString, IsOptional } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;
    @IsOptional()
    @IsString()
    description?: string;

    @IsString()
    price: string; // send as string to avoid float precision issues
}