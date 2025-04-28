import { IsNumber, IsString } from "class-validator";

export class CreateAvaliacaoLojaDto {
    @IsNumber()
    nota: number;

    @IsString()
    descricao: string;

    @IsNumber()
    agricultorId: number
}
