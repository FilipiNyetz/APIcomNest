import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CidadeService } from './cidade.service';
import { CidadeController } from './cidade.controller';
import { Cidade } from './entities/cidade.entity';
import { UfModule } from 'src/uf/uf.module';  // Importa o módulo da UF

@Module({
  imports: [TypeOrmModule.forFeature([Cidade]), UfModule],  // Importa o UfModule
  providers: [CidadeService],
  controllers: [CidadeController],
})
export class CidadeModule { }
