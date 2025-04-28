import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';
import { Estoque } from '../../estoque/entities/estoque.entity';
import { ParceiraMarketing } from 'src/parceiras-marketing/entities/parceiras-marketing.entity';
import { AvaliacaoLoja } from 'src/avaliacao-loja/entities/avaliacao-loja.entity';

@Entity('agricultores')
export class Agricultor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    cnpj: string;

    @Column()
    endereco: string;

    @Column()
    telefone: string;

    @OneToOne(() => Estoque, (estoque) => estoque.agricultor, { cascade: true })
    @JoinColumn()
    estoque: Estoque;

    @ManyToMany(() => Produto, (produto) => produto.agricultor)
    @JoinTable({
        name: 'agricultores_produtos', // nome da tabela pivot
        joinColumn: {
            name: 'agricultor_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'produto_id',
            referencedColumnName: 'id',
        },
    })
    produtos: Produto[];

    @ManyToMany(() => ParceiraMarketing, (parceiraMarketing) => parceiraMarketing.agricultores)
    @JoinTable()
    parceiras: ParceiraMarketing[];

    @OneToMany(() => AvaliacaoLoja, avaliacao => avaliacao.agricultor)
    avaliacoes: AvaliacaoLoja[];
}
