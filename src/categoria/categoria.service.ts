import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) { }

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const categoria = this.categoriaRepository.create(createCategoriaDto);
    return this.categoriaRepository.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find({
      relations: ['produtos'],
    });
  }

  findOne(id: number) {
    return this.categoriaRepository.findOneBy({ id })
  }


  async update(id: number, UpdateCategoriaDto: UpdateCategoriaDto) {
    const Categoria = await this.categoriaRepository.findOneBy({ id })
    if (!Categoria) return null
    this.categoriaRepository.merge(Categoria, UpdateCategoriaDto)
    return this.categoriaRepository.save(Categoria)
  }

  async remove(id: number): Promise<void> {
    await this.categoriaRepository.delete(id);
  }
}
