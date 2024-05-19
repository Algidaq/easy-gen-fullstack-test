import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Request } from 'express';
import { IJwtTokenPayload } from '../services';

export const AuthUser = createParamDecorator<
  never,
  ExecutionContext,
  IJwtTokenPayload | undefined
>((data, context) => {
  const req = context.switchToHttp().getRequest<Request>();
  const user = (req as any).user;
  return user;
});
