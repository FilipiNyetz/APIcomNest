import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEntregadorDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    telefone: string;

    @IsString()
    @IsNotEmpty()
    veiculo: string;

    @IsString()
    @IsNotEmpty()
    cnh: string;


}