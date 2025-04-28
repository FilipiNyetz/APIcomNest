import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from './pagamento.controller';
import { Pagamento } from '../pagamento/entities/pagamento.entity';
import { Pedido } from '../pedido/entities/pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pagamento, Pedido])],
  controllers: [PagamentoController],
  providers: [PagamentoService],
})
export class PagamentoModule { }
