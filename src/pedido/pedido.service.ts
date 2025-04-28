import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { Produto } from '../produto/entities/produto.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Pagamento } from '../pagamento/entities/pagamento.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Pagamento)
    private readonly pagamentoRepository: Repository<Pagamento>,
  ) { }

  // Criar Pedido
  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    if (!createPedidoDto.clienteId) {
      throw new Error("clienteId é obrigatório.");
    }

    // Buscar o cliente para associar ao pedido
    const cliente = await this.clienteRepository.findOneBy({ id: createPedidoDto.clienteId });
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${createPedidoDto.clienteId} não encontrado`);
    }

    // Criar e associar o pedido
    const pedido = this.pedidoRepository.create(createPedidoDto);
    pedido.cliente = cliente;

    // Salvar o pedido
    return this.pedidoRepository.save(pedido);
  }

  // Listar todos os pedidos
  findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      relations: ['produtos', 'cliente', 'pagamento'], // Incluir as relações
    });
  }

  // Encontrar um pedido por ID
  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: ['produtos', 'cliente', 'pagamento'], // Incluir as relações
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado.`);
    }

    return pedido;
  }

  // Atualizar um pedido
  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    // Buscar o pedido que será atualizado
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: ['produtos', 'cliente', 'pagamento'], // Incluir as relações
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado.`);
    }

    // Atualizar as propriedades do pedido
    this.pedidoRepository.merge(pedido, updatePedidoDto);

    // Salvar as alterações
    return this.pedidoRepository.save(pedido);
  }

  // Remover um pedido
  async remove(id: number): Promise<void> {
    // Buscar o pedido para garantir que ele existe
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: ['produtos', 'cliente', 'pagamento'], // Incluir as relações
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado.`);
    }

    // Remover o pedido
    await this.pedidoRepository.delete(id);
  }
}
