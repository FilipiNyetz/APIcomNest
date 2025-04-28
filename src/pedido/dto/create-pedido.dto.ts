import { IsArray, IsString, IsDateString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePedidoDto {
    @IsDateString()
    data: Date;

    @IsString()
    status: string;

    @IsArray()
    itens: string[];

    @IsNumber()
    valor: number;

    @IsArray()
    produtoIds: number[];

    @IsNotEmpty()
    @IsNumber()
    clienteId: number;
}
