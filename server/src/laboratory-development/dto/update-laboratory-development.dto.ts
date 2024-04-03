import { PartialType } from '@nestjs/mapped-types';
import { CreateLaboratoryDevelopmentDto } from './create-laboratory-development.dto';

export class UpdateLaboratoryDevelopmentDto extends PartialType(CreateLaboratoryDevelopmentDto) {}
