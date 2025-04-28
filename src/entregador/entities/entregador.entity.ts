import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pedido } from '../../pedido/entities/pedido.entity';

@Entity()
export class Entregador {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    telefone: string;

    @Column()
    veiculo: string;

    @Column()
    cnh: string;

    @OneToMany(() => Pedido, (pedido) => pedido.entregador)
    pedidos: Pedido[];

}
