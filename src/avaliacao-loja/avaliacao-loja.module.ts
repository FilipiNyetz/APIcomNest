import { Module } from '@nestjs/common';
import { AvaliacaoLojaService } from './avaliacao-loja.service';
import { AvaliacaoLojaController } from './avaliacao-loja.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvaliacaoLoja } from './entities/avaliacao-loja.entity';
import { Agricultor } from 'src/agricultor/entities/agricultor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AvaliacaoLoja, Agricultor])],
  controllers: [AvaliacaoLojaController],
  providers: [AvaliacaoLojaService],
})
export class AvaliacaoLojaModule { }
