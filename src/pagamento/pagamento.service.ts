import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagamento } from './entities/pagamento.entity';
import { Pedido } from '../pedido/entities/pedido.entity';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';

@Injectable()
export class PagamentoService {

  constructor(
    @InjectRepository(Pagamento)
    private readonly pagamentoRepository: Repository<Pagamento>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) { }

  // Criar pagamento
  async create(createPagamentoDto: CreatePagamentoDto): Promise<Pagamento> {
    const pedido = await this.pedidoRepository.findOneBy({ id: createPagamentoDto.pedidoId });

    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${createPagamentoDto.pedidoId} não encontrado`);
    }

    const pagamento = this.pagamentoRepository.create(createPagamentoDto);
    pagamento.pedido = pedido; // Associar o pagamento ao pedido

    return this.pagamentoRepository.save(pagamento);
  }

  // Listar todos os pagamentos
  findAll(): Promise<Pagamento[]> {
    return this.pagamentoRepository.find();
  }

  // Encontrar um pagamento por ID
  async findOne(id: number): Promise<Pagamento> {
    const pagamento = await this.pagamentoRepository.findOneBy({ id });

    if (!pagamento) {
      throw new NotFoundException(`Pagamento com ID ${id} não encontrado`);
    }

    return pagamento;
  }

  // Atualizar um pagamento
  async update(id: number, updatePagamentoDto: UpdatePagamentoDto): Promise<Pagamento> {
    const pagamento = await this.pagamentoRepository.findOneBy({ id });

    if (!pagamento) {
      throw new NotFoundException(`Pagamento com ID ${id} não encontrado`);
    }

    // Atualizar os dados do pagamento com as informações do DTO
    this.pagamentoRepository.merge(pagamento, updatePagamentoDto);

    // Salvar as alterações
    return this.pagamentoRepository.save(pagamento);
  }

  // Deletar um pagamento
  async remove(id: number): Promise<void> {
    const pagamento = await this.pagamentoRepository.findOneBy({ id });

    if (!pagamento) {
      throw new NotFoundException(`Pagamento com ID ${id} não encontrado`);
    }

    // Deletar o pagamento do banco de dados
    await this.pagamentoRepository.delete(id);
  }
}
