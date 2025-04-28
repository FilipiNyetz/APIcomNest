import { IsString, IsNumber } from 'class-validator';

export class CreatePagamentoDto {
    @IsString()
    forma_pagamento: string;

    @IsString()
    status: string;

    @IsNumber()
    valor: number;

    @IsNumber()
    pedidoId: number;
}
