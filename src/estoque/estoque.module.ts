import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstoqueService } from './estoque.service';
import { EstoqueController } from './estoque.controller';
import { Estoque } from './entities/estoque.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estoque])],  // Registra o repositório da UF
  providers: [EstoqueService],
  controllers: [EstoqueController],
  exports: [TypeOrmModule],
})
export class EstoqueModule { }
