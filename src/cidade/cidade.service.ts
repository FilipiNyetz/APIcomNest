import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import { Cidade } from './entities/cidade.entity';
import { Uf } from 'src/uf/entities/uf.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CidadeService {
  constructor(
    @InjectRepository(Cidade)
    private readonly repository: Repository<Cidade>,

    @InjectRepository(Uf)
    private readonly ufRepository: Repository<Uf>, // Adiciona o repositório da UF
  ) { }

  async create(createCidadeDto: CreateCidadeDto) {
    // Aqui, passamos um objeto para o `findOne` em vez de apenas o id
    const uf = await this.ufRepository.findOne({
      where: { id: createCidadeDto.ufId },  // Passa o campo de ID corretamente
    });

    if (!uf) {
      throw new Error('UF not found'); // Caso não encontre a UF
    }

    // Cria a cidade e associa o UF
    const cidade = this.repository.create({
      nome: createCidadeDto.nome,
      uf,  // Relaciona a UF à cidade
    });

    return this.repository.save(cidade); // Salva a cidade
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateCidadeDto: UpdateCidadeDto) {
    const cidade = await this.repository.findOneBy({ id });
    if (!cidade) return null;
    this.repository.merge(cidade, updateCidadeDto);
    return this.repository.save(cidade);
  }

  async remove(id: number) {
    const cidade = await this.repository.findOneBy({ id });
    if (!cidade) return null;
    return this.repository.remove(cidade);
  }
}
