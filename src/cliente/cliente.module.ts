import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { Cliente } from './entities/cliente.entity';
import { Pedido } from '../pedido/entities/pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Pedido])],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule { }
