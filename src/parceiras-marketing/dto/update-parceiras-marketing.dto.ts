import { PartialType } from '@nestjs/mapped-types';
import { CreateParceiraMarketingDto } from './create-parceiras-marketing.dto';

export class UpdateParceirasMarketingDto extends PartialType(CreateParceiraMarketingDto) { }
