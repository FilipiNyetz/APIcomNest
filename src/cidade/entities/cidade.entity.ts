import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Uf } from 'src/uf/entities/uf.entity';
import { Estudante } from 'src/estudante/entities/estudante.entity';

@Entity()
export class Cidade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @ManyToOne(() => Uf, (uf) => uf.cidades, { eager: true })
    uf: Uf;

    @OneToMany(() => Estudante, (estudante) => estudante.cidade)
    estudantes: Estudante[];
}
