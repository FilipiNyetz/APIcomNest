import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Agricultor } from '../../agricultor/entities/agricultor.entity';

@Entity()
export class ParceiraMarketing {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cnpj: string;

    @Column()
    nome: string;

    @Column()
    endereco: string;

    @Column()
    telefone: string;

    @Column()
    email: string;

    @ManyToMany(() => Agricultor, (agricultor) => agricultor.parceiras)
    @JoinTable()
    agricultores: Agricultor[];
}
