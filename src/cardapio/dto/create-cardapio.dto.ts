import { IsEnum, IsArray, IsMongoId } from 'class-validator';
import { Turno } from '../../common/enums/turno.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardapioDto {
  @ApiProperty({ enum: Turno, description: 'Turno do cardápio' })
  @IsEnum(Turno, { message: 'Turno deve ser DIURNO ou NOTURNO' })
  turno: Turno;

  @ApiProperty({ type: [String], description: 'Lista de IDs dos produtos' })
  @IsArray()
  @IsMongoId({ each: true })
  produtoIds: string[];
}
