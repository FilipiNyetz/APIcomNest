import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Agricultor } from './entities/agricultor.entity';
import { CreateAgricultorDto } from './dto/create-agricultor.dto';
import { UpdateAgricultorDto } from './dto/update-agricultor.dto';
import { Produto } from '../produto/entities/produto.entity';
import { ParceiraMarketing } from '../parceiras-marketing/entities/parceiras-marketing.entity';
import { AvaliacaoLoja } from 'src/avaliacao-loja/entities/avaliacao-loja.entity';

@Injectable()
export class AgricultorService {
  constructor(
    @InjectRepository(Agricultor)
    private readonly agricultorRepository: Repository<Agricultor>,
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    @InjectRepository(ParceiraMarketing)
    private readonly parceiraRepository: Repository<ParceiraMarketing>,
    @InjectRepository(AvaliacaoLoja)
    private readonly avaliacaoLojaRepository: Repository<AvaliacaoLoja>,
  ) { }

  async create(createAgricultorDto: CreateAgricultorDto): Promise<Agricultor> {
    const produtos = await this.produtoRepository.findBy({
      id: In(createAgricultorDto.produtoIds ?? []),
    });

    // Buscar as parceiras de marketing associadas ao agricultor
    const parceiras = createAgricultorDto.parceiraIds
      ? await this.parceiraRepository.findBy({
        id: In(createAgricultorDto.parceiraIds),
      })
      : [];

    const agricultor = this.agricultorRepository.create({
      ...createAgricultorDto,
      produtos,
      parceiras, // Associar as parceiras ao agricultor
    });

    return this.agricultorRepository.save(agricultor);
  }

  findAll(): Promise<Agricultor[]> {
    return this.agricultorRepository.find({ relations: ['produtos', 'parceiras'] });
  }

  async findOne(id: number): Promise<Agricultor | null> {
    return this.agricultorRepository.findOne({
      where: { id },
      relations: ['produtos', 'parceiras'], // Incluir as parceiras nas relações
    });
  }

  async update(id: number, updateAgricultorDto: UpdateAgricultorDto): Promise<Agricultor> {
    const agricultor = await this.agricultorRepository.findOne({
      where: { id },
      relations: ['produtos', 'parceiras'], // Incluir as parceiras nas relações
    });

    if (!agricultor) {
      throw new Error('Agricultor não encontrado');
    }

    // Atualizar os produtos, se fornecidos no DTO
    if (updateAgricultorDto.produtoIds) {
      const produtos = await this.produtoRepository.findBy({
        id: In(updateAgricultorDto.produtoIds),
      });
      agricultor.produtos = produtos;
    }

    // Atualizar as parceiras de marketing, se fornecidas no DTO
    if (updateAgricultorDto.parceiraIds) {
      const parceiras = await this.parceiraRepository.findBy({
        id: In(updateAgricultorDto.parceiraIds),
      });

      agricultor.parceiras = parceiras;
    }

    // Remover os campos de ID (produtoIds, parceiraIds) do DTO antes de fazer o merge
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { produtoIds, parceiraIds, ...rest } = updateAgricultorDto;
    this.agricultorRepository.merge(agricultor, rest);

    return this.agricultorRepository.save(agricultor);
  }

  async remove(id: number): Promise<void> {
    await this.agricultorRepository.delete(id);
  }
}
