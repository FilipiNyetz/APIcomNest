import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cidade } from 'src/cidade/entities/cidade.entity';

@Entity()
export class Estudante {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    matricula: string;

    @Column()
    email: string;

    @Column()
    dataNascimento: string;

    @ManyToOne(() => Cidade, (cidade) => cidade.estudantes, { eager: true })
    cidade: Cidade;
}
