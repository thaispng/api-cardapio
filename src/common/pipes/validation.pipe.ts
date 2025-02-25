import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype) {
      return value;
    }

    const object = plainToClass(metadata.metatype, value);

    const errors = await validate(object);

    if (errors.length > 0) {
      const errorMessages = this.formatValidationErrors(errors);
      throw new BadRequestException(`Validation failed: ${errorMessages}`);
    }
    
    return value;
  }

  private formatValidationErrors(errors: ValidationError[]): string {
    return errors
      .map((error) => {
        return Object.values(error.constraints || {}).join(', ');
      })
      .join('; ');
  }
}
