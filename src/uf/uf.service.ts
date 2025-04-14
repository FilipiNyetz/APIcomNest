import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUfDto } from './dto/create-uf.dto';
import { UpdateUfDto } from './dto/update-uf.dto';
import { Repository } from 'typeorm';
import { Uf } from './entities/uf.entity';

@Injectable()
export class UfService {
  constructor(
    @InjectRepository(Uf)
    private readonly repository: Repository<Uf>
  ) { }

  create(createUfDto: CreateUfDto) {
    const Uf = this.repository.create(createUfDto)
    return this.repository.save(Uf)
  }

  findAll() {
    return this.repository.find()
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id })
  }

  async update(id: number, updateUfDto: UpdateUfDto) {
    const Uf = await this.repository.findOneBy({ id })
    if (!Uf) return null
    this.repository.merge(Uf, updateUfDto)
    return this.repository.save(Uf)
  }

  async remove(id: number) {
    const Uf = await this.repository.findOneBy({ id })
    if (!Uf) return null
    return this.repository.remove(Uf)
  }
}
