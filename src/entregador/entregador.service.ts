// src/entregador/entregador.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entregador } from './entities/entregador.entity';
import { CreateEntregadorDto } from './dto/create-entregador.dto';
import { UpdateEntregadorDto } from './dto/update-entregador.dto';

@Injectable()
export class EntregadorService {
  constructor(
    @InjectRepository(Entregador)
    private readonly entregadorRepository: Repository<Entregador>,
  ) { }

  async create(createEntregadorDto: CreateEntregadorDto): Promise<Entregador> {
    const entregador = this.entregadorRepository.create(createEntregadorDto);
    return this.entregadorRepository.save(entregador);
  }

  async findAll(): Promise<Entregador[]> {
    return this.entregadorRepository.find();
  }

  async findOne(id: number): Promise<Entregador | null> {
    return this.entregadorRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateEntregadorDto: UpdateEntregadorDto,
  ): Promise<Entregador> {
    const entregador = await this.entregadorRepository.findOne({
      where: { id },
    });

    if (!entregador) {
      throw new Error('Entregador não encontrado');
    }

    this.entregadorRepository.merge(entregador, updateEntregadorDto);
    return this.entregadorRepository.save(entregador);
  }

  async remove(id: number): Promise<void> {
    await this.entregadorRepository.delete(id);
  }
}
