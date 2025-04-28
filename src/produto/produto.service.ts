import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from '../produto/entities/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Categoria } from '../categoria/entities/categoria.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) { }

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id: createProdutoDto.categoriaId },
    });
    const estoque = await this.categoriaRepository.findOne({
      where: { id: createProdutoDto.estoqueId },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }
    if (!estoque) {
      throw new NotFoundException('Estoque não encontrada');
    }

    const produto = this.produtoRepository.create({
      nome: createProdutoDto.nome,
      categoria,
      preco: createProdutoDto.preco,
      quantidade: createProdutoDto.quantidade,
      descricao: createProdutoDto.descricao,
      estoque,
    });

    return this.produtoRepository.save(produto);
  }

  findAll() {
    return this.produtoRepository.find();
  }

  findOne(id: number) {
    return this.produtoRepository.findOneBy({ id })
  }
  async update(id: number, UpdateProdutoDto: UpdateProdutoDto) {
    const produto = await this.produtoRepository.findOneBy({ id });
    if (!produto) return null;
    this.produtoRepository.merge(produto, UpdateProdutoDto);
    return this.produtoRepository.save(produto);
  }
  async remove(id: number) {
    const produto = await this.produtoRepository.findOneBy({ id });
    if (!produto) return null;
    return this.produtoRepository.remove(produto);
  }
}