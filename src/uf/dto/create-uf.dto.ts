import { IsString } from "class-validator";

export class CreateUfDto {

    @IsString()
    nome: string;

    @IsString()
    sigla: string;

}
