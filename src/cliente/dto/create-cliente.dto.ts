import { IsString } from 'class-validator';

export class CreateClienteDto {
    @IsString()
    nome: string;

    @IsString()
    cpf: string;

    @IsString()
    telefone: string;

    @IsString()
    endereco: string;

    @IsString()
    email: string;
}
