import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateParceiraMarketingDto {
    @IsString()
    @IsNotEmpty()
    cnpj: string;

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    endereco: string;

    @IsString()
    @IsNotEmpty()
    telefone: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsOptional()
    @IsArray()
    agricultorIds?: number[];
}