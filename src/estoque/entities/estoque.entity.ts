import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';
import { Agricultor } from '../../agricultor/entities/agricultor.entity';

@Entity('estoque')
export class Estoque {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantidadeProdutos: number;

    @Column()
    endereco: string;

    @ManyToOne(() => Agricultor, (agricultor) => agricultor.estoque)
    agricultor: Agricultor;

    @OneToMany(() => Produto, produto => produto.categoria)
    produtos: Produto[];
}
