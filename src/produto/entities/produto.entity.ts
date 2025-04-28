import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Estoque } from 'src/estoque/entities/estoque.entity';
import { Agricultor } from 'src/agricultor/entities/agricultor.entity';

@Entity('produtos')
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    preco: number;

    @Column()
    quantidade: number;

    @Column()
    descricao: string;

    @ManyToOne(() => Categoria, categoria => categoria.produtos, { onDelete: 'SET NULL' })
    categoria: Categoria;

    @ManyToOne(() => Estoque, estoque => estoque.produtos, { onDelete: 'SET NULL' })
    estoque: Estoque;

    @ManyToMany(() => Agricultor, (agricultor) => agricultor.produtos)
    agricultor: Agricultor;
}
