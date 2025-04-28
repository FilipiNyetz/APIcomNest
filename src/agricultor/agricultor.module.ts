// src/agricultor/agricultor.module.ts

import { Module } from '@nestjs/common';
import { AgricultorService } from './agricultor.service';
import { AgricultorController } from './agricultor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agricultor } from './entities/agricultor.entity';
import { Produto } from '../produto/entities/produto.entity';
import { ParceiraMarketingModule } from '../parceiras-marketing/parceiras-marketing.module'; // Importe o módulo de Parceiras de Marketing
import { ParceiraMarketing } from 'src/parceiras-marketing/entities/parceiras-marketing.entity';
import { AvaliacaoLojaModule } from 'src/avaliacao-loja/avaliacao-loja.module';
import { AvaliacaoLoja } from 'src/avaliacao-loja/entities/avaliacao-loja.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agricultor, Produto, ParceiraMarketing, AvaliacaoLoja]),
    ParceiraMarketingModule,
    AvaliacaoLojaModule,  // Certifique-se de importar o ParceiraMarketingModule
  ],
  providers: [AgricultorService],
  controllers: [AgricultorController],
})
export class AgricultorModule { }
