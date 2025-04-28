import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AgricultorService } from './agricultor.service';
import { CreateAgricultorDto } from './dto/create-agricultor.dto';
import { UpdateAgricultorDto } from './dto/update-agricultor.dto';

@Controller('agricultores')
export class AgricultorController {
  constructor(private readonly agricultorService: AgricultorService) { }

  @Post()
  create(@Body() createAgricultorDto: CreateAgricultorDto) {
    return this.agricultorService.create(createAgricultorDto);
  }

  @Get()
  findAll() {
    return this.agricultorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agricultorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgricultorDto: UpdateAgricultorDto) {
    return this.agricultorService.update(+id, updateAgricultorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agricultorService.remove(+id);
  }
}
