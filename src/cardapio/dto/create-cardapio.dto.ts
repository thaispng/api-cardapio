import { IsEnum, IsArray, IsMongoId, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Turno } from '../../common/enums/turno.enum';

export class CreateCardapioDto {
  @ApiProperty({
    enum: Turno,
    description: 'Turno do cardápio (DIURNO ou NOTURNO)',
  })
  @IsEnum(Turno, { message: 'Turno deve ser DIURNO ou NOTURNO' })
  turno: Turno;

  @ApiProperty({
    type: [String],
    description: 'Array de IDs dos produtos que serão adicionados ao cardápio',
  })
  @IsArray({ message: 'produtoIds deve ser um array' })
  @ArrayMinSize(1, { message: 'Selecione pelo menos um produto' })
  @IsMongoId({ each: true, message: 'ID de produto inválido' })
  produtoIds: string[];
}
