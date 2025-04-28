import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Pedido } from '../../pedido/entities/pedido.entity';

@Entity()
export class Pagamento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    forma_pagamento: string;

    @Column()
    status: string;

    @Column('decimal', { precision: 10, scale: 2 })
    valor: number;

    @OneToOne(() => Pedido, (pedido) => pedido.pagamento)
    pedido: Pedido;
}
