import { IsNumber, IsString } from "class-validator";

export class CreateEstoqueDto {

    @IsString()
    Endereco: string;

    @IsNumber()
    quantidadeProdutos: number;

}
