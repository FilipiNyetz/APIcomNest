import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estoque } from './entities/estoque.entity';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { UpdateEstoqueDto } from './dto/update-estoque.dto';

@Injectable()
export class EstoqueService {
  constructor(
    @InjectRepository(Estoque)
    private readonly estoqueRepository: Repository<Estoque>,
  ) { }

  async create(createEstoqueDto: CreateEstoqueDto): Promise<Estoque> {
    const estoque = this.estoqueRepository.create({
      quantidadeProdutos: createEstoqueDto.quantidadeProdutos,
      endereco: createEstoqueDto.Endereco
    });
    return this.estoqueRepository.save(estoque);
  }

  async findAll(): Promise<Estoque[]> {
    return this.estoqueRepository.find({
      relations: ['produtos'], // Opcional: se quiser trazer os produtos juntos
    });
  }

  findOne(id: number) {
    return this.estoqueRepository.findOneBy({ id })
  }


  async update(id: number, UpadteEstoqueDto: UpdateEstoqueDto) {
    const Estoque = await this.estoqueRepository.findOneBy({ id })
    if (!Estoque) return null
    this.estoqueRepository.merge(Estoque, UpadteEstoqueDto)
    return this.estoqueRepository.save(Estoque)
  }

  async remove(id: number): Promise<void> {
    await this.estoqueRepository.delete(id);
  }
}
