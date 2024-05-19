import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { IAuthLoginDto, kAuthLoginSchema } from './auth.dto';

@Injectable()
export class AuthLoginValidationPipe
  implements PipeTransform<any, IAuthLoginDto>
{
  transform(value: any, metadata: ArgumentMetadata): IAuthLoginDto {
    if (metadata.type !== 'body') {
      return value;
    }
    const result = kAuthLoginSchema.safeParse(value);
    if (result.error) {
      throw new BadRequestException(result.error.errors[0].message);
    }
    return result.data;
  }
}
