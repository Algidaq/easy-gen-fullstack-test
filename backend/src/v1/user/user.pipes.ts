import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ICreateUserDto, kCreateUserSchema } from './models';

@Injectable()
export class CreateUserValidationPipe
  implements PipeTransform<any, ICreateUserDto>
{
  transform(value: any, metadata: ArgumentMetadata): ICreateUserDto {
    if (metadata.type !== 'body') return value;
    const result = kCreateUserSchema.safeParse(value);
    if (result.error) {
      throw new BadRequestException(result.error.errors[0].message);
    }
    return result.data;
  }
}
