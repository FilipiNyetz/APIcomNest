import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Pagamento } from '../../pagamento/entities/pagamento.entity';
import { Entregador } from 'src/entregador/entities/entregador.entity';

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data: Date;

    @Column()
    status: string;

    @Column('simple-array')
    itens: string[];

    @Column('decimal', { precision: 10, scale: 2 })
    valor: number;

    @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
    cliente: Cliente;

    @ManyToMany(() => Produto)
    @JoinTable()
    produtos: Produto[];

    @OneToOne(() => Pagamento)
    @JoinColumn()
    pagamento: Pagamento;

    @ManyToOne(() => Entregador, (entregador) => entregador.pedidos)
    entregador: Entregador;
}
