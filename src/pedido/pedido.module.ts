import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { Pedido } from './entities/pedido.entity';
import { Produto } from '../produto/entities/produto.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Pagamento } from '../pagamento/entities/pagamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, Produto, Cliente, Pagamento])],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule { }
