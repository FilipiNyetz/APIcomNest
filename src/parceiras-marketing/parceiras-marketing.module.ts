// src/parceiras-marketing/parceiras-marketing.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParceiraMarketing } from './entities/parceiras-marketing.entity'; // Importando a entidade ParceiraMarketing
import { ParceiraMarketingService } from './parceiras-marketing.service'; // Corrigir o nome da classe
import { ParceirasMarketingController } from './parceiras-marketing.controller';
import { Agricultor } from 'src/agricultor/entities/agricultor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParceiraMarketing, Agricultor])], // Aqui você injeta o repositório da entidade ParceiraMarketing
  controllers: [ParceirasMarketingController],
  providers: [ParceiraMarketingService],
})
export class ParceiraMarketingModule { }
