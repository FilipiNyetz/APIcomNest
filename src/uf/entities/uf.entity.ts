import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cidade } from 'src/cidade/entities/cidade.entity';

@Entity()
export class Uf {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ length: 2 })
    sigla: string;

    @OneToMany(() => Cidade, (cidade) => cidade.uf)
    cidades: Cidade[];
}
