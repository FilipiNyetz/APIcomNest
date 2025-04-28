import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pedido } from '../../pedido/entities/pedido.entity';

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    cpf: string;

    @Column()
    nome: string;

    @Column()
    telefone: string;

    @Column()
    endereco: string;

    @Column()
    email: string;

    @OneToMany(() => Pedido, (pedido) => pedido.cliente)
    pedidos: Pedido[];
}
