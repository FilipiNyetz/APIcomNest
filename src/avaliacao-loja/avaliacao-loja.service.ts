// src/avaliacao-agricultor/avaliacao-agricultor.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAvaliacaoLojaDto } from './dto/create-avaliacao-loja.dto';
import { UpdateAvaliacaoLojaDto } from './dto/update-avaliacao-loja.dto';
import { AvaliacaoLoja } from './entities/avaliacao-loja.entity';
import { Agricultor } from 'src/agricultor/entities/agricultor.entity';


@Injectable()
export class AvaliacaoLojaService {
  constructor(
    @InjectRepository(Agricultor)
    private readonly agricultorRepository: Repository<Agricultor>,
    @InjectRepository(AvaliacaoLoja)
    private readonly avaliacaoRepository: Repository<AvaliacaoLoja>,
  ) { }

  async create(createAvaliacaoLojaDto: CreateAvaliacaoLojaDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const agricultor = await this.agricultorRepository.findOne({
      where: { id: createAvaliacaoLojaDto.agricultorId },
    });

    if (!agricultor) {
      throw new NotFoundException('Agricultor não encontrado');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const avaliacao = this.avaliacaoRepository.create({
      nota: createAvaliacaoLojaDto.nota,
      descricao: createAvaliacaoLojaDto.descricao,
      agricultor: { id: createAvaliacaoLojaDto.agricultorId }
    });

    return this.avaliacaoRepository.save(avaliacao);
  }

  findAll() {
    return this.avaliacaoRepository.find({ relations: ['agricultor'] });
  }

  findOne(id: number) {
    return this.avaliacaoRepository.findOne({
      where: { id }, // Forma correta de passar o filtro
      relations: ['agricultor'], // Relacionamento que você quer carregar
    });
  }


  async update(id: number, dto: UpdateAvaliacaoLojaDto) {
    const avaliacao = await this.avaliacaoRepository.findOneBy({ id });
    if (!avaliacao) {
      throw new NotFoundException('Avaliação não encontrada');
    }

    Object.assign(avaliacao, dto);

    return this.avaliacaoRepository.save(avaliacao);
  }

  async remove(id: number) {
    const avaliacao = await this.avaliacaoRepository.findOneBy({ id });
    if (!avaliacao) {
      throw new NotFoundException('Avaliação não encontrada');
    }

    return this.avaliacaoRepository.remove(avaliacao);
  }
}
