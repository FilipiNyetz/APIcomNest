import { IsArray, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateAgricultorDto {

    @IsString()
    cnpj: string;

    @IsString()
    nome: string;

    @IsString()
    endereco: string;

    @IsString()
    telefone: string;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    produtoIds?: number[];

    @IsArray()
    @IsOptional()
    parceiraIds?: number[]; // IDs das parceiras de marketing

    @IsArray()
    @IsOptional()
    avaliacoesIds?: number[];
}
