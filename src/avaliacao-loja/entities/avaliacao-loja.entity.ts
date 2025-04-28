import { Agricultor } from "src/agricultor/entities/agricultor.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AvaliacaoLoja {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nota: number

    @Column()
    descricao: string

    @ManyToOne(() => Agricultor, agricultor => agricultor.avaliacoes, { onDelete: 'CASCADE' })
    agricultor: Agricultor;

}
