import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstudanteDto } from './dto/create-estudante.dto';
import { UpdateEstudanteDto } from './dto/update-estudante.dto';
import { Estudante } from './entities/estudante.entity';
import { Cidade } from 'src/cidade/entities/cidade.entity';

@Injectable()
export class EstudanteService {
  constructor(
    @InjectRepository(Estudante)
    private readonly estudanteRepository: Repository<Estudante>,
    @InjectRepository(Cidade)
    private readonly cidadeRepository: Repository<Cidade>,
  ) { }

  async create(dto: CreateEstudanteDto) {
    const cidade = await this.cidadeRepository.findOneBy({ id: dto.cidadeId });
    if (!cidade) {
      throw new NotFoundException('Cidade não encontrada');
    }

    const estudante = this.estudanteRepository.create({
      ...dto,
      cidade,
    });

    return this.estudanteRepository.save(estudante);
  }

  findAll() {
    return this.estudanteRepository.find();
  }

  findOne(id: number) {
    return this.estudanteRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateEstudanteDto) {
    const estudante = await this.estudanteRepository.findOneBy({ id });
    if (!estudante) return null;

    this.estudanteRepository.merge(estudante, dto);
    return this.estudanteRepository.save(estudante);
  }

  async remove(id: number) {
    const estudante = await this.estudanteRepository.findOneBy({ id });
    if (!estudante) return null;

    return this.estudanteRepository.remove(estudante);
  }
}
