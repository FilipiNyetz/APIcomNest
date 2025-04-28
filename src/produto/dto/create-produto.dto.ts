import { IsNumber, IsString } from "class-validator";

export class CreateProdutoDto {

    @IsString()
    nome: string;

    @IsNumber()
    categoriaId: number;

    @IsNumber()
    preco: number;

    @IsNumber()
    quantidade: number

    @IsString()
    descricao: string;

    @IsNumber()
    estoqueId: number;

}
