import { IsNumber, IsString } from "class-validator";
import { Type } from 'class-transformer';


export class CreateCidadeDto {

    @IsString()
    nome: string;

    @Type(() => Number)
    @IsNumber()
    ufId: number;

}
