import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Uf } from './entities/uf.entity';
import { UfService } from './uf.service';
import { UfController } from './uf.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Uf])],  // Registra o repositório da UF
  providers: [UfService],
  controllers: [UfController],
  exports: [TypeOrmModule],  // Exporte o TypeOrmModule para que outros módulos possam usar os repositórios
})
export class UfModule { }
