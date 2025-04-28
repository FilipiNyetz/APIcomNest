
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParceiraMarketing } from './entities/parceiras-marketing.entity';
import { CreateParceiraMarketingDto } from './dto/create-parceiras-marketing.dto';
import { UpdateParceirasMarketingDto } from './dto/update-parceiras-marketing.dto';
import { Agricultor } from '../agricultor/entities/agricultor.entity';
import { In } from 'typeorm';

@Injectable()
export class ParceiraMarketingService {
  constructor(
    @InjectRepository(ParceiraMarketing)
    private readonly parceiraRepository: Repository<ParceiraMarketing>,
    @InjectRepository(Agricultor)
    private readonly agricultorRepository: Repository<Agricultor>,
  ) { }

  async create(createParceiraMarketingDto: CreateParceiraMarketingDto): Promise<ParceiraMarketing> {
    // Verificar se existem agricultores associados no DTO
    const agricultores = await this.agricultorRepository.findBy({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      id: In(createParceiraMarketingDto.agricultorIds ?? []),
    });

    const parceira = this.parceiraRepository.create({
      ...createParceiraMarketingDto,
      agricultores,
    });

    return this.parceiraRepository.save(parceira);
  }

  async findAll(): Promise<ParceiraMarketing[]> {
    return this.parceiraRepository.find({ relations: ['agricultores'] });
  }

  async findOne(id: number): Promise<ParceiraMarketing | null> {
    return this.parceiraRepository.findOne({ where: { id }, relations: ['agricultores'] });
  }

  async update(id: number, updateParceiraMarketingDto: UpdateParceirasMarketingDto): Promise<ParceiraMarketing> {
    const parceira = await this.parceiraRepository.findOne({ where: { id }, relations: ['agricultores'] });

    if (!parceira) {
      throw new Error('Parceira de marketing não encontrada');
    }

    if (updateParceiraMarketingDto.agricultorIds) {
      const agricultores = await this.agricultorRepository.findBy({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        id: In(updateParceiraMarketingDto.agricultorIds),
      });
      parceira.agricultores = agricultores;
    }

    this.parceiraRepository.merge(parceira, updateParceiraMarketingDto);
    return this.parceiraRepository.save(parceira);
  }

  async remove(id: number): Promise<void> {
    await this.parceiraRepository.delete(id);
  }
}
