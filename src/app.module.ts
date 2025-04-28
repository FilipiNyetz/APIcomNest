import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { ProdutoModule } from './produto/produto.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { Produto } from './produto/entities/produto.entity';
import { EstoqueModule } from './estoque/estoque.module';
import { Estoque } from './estoque/entities/estoque.entity';
import { AgricultorModule } from './agricultor/agricultor.module';
import { Agricultor } from './agricultor/entities/agricultor.entity';
import { ClienteModule } from './cliente/cliente.module';
import { PedidoModule } from './pedido/pedido.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { Pagamento } from './pagamento/entities/pagamento.entity';
import { Pedido } from './pedido/entities/pedido.entity';
import { Cliente } from './cliente/entities/cliente.entity';
import { EntregadorModule } from './entregador/entregador.module';
import { ParceiraMarketingModule } from './parceiras-marketing/parceiras-marketing.module';
import { Entregador } from './entregador/entities/entregador.entity';
import { ParceiraMarketing } from './parceiras-marketing/entities/parceiras-marketing.entity';
import { AvaliacaoLojaModule } from './avaliacao-loja/avaliacao-loja.module';
import { AvaliacaoLoja } from './avaliacao-loja/entities/avaliacao-loja.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Categoria, Produto, Estoque, Agricultor, Pagamento, Pedido, Cliente, Entregador, ParceiraMarketing, AvaliacaoLoja],
      synchronize: true,
    }),

    CategoriaModule, ProdutoModule, EstoqueModule, AgricultorModule, ClienteModule, PedidoModule, PagamentoModule, EntregadorModule, ParceiraMarketingModule, AvaliacaoLojaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
