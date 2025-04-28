import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParceiraMarketingService } from './parceiras-marketing.service';
import { CreateParceiraMarketingDto } from './dto/create-parceiras-marketing.dto';
import { UpdateParceirasMarketingDto } from './dto/update-parceiras-marketing.dto';

@Controller('parceiras-marketing')
export class ParceirasMarketingController {
  constructor(private readonly parceirasMarketingService: ParceiraMarketingService) { }

  @Post()
  create(@Body() createParceirasMarketingDto: CreateParceiraMarketingDto) {
    return this.parceirasMarketingService.create(createParceirasMarketingDto);
  }

  @Get()
  findAll() {
    return this.parceirasMarketingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parceirasMarketingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParceirasMarketingDto: UpdateParceirasMarketingDto) {
    return this.parceirasMarketingService.update(+id, updateParceirasMarketingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parceirasMarketingService.remove(+id);
  }
}
