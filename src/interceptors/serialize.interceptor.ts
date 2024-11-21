import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

// Create a decorator to use the SerializeInterceptor
export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run before handling the handler

    return handler.handle().pipe(
      map((data: any) => {
        // Run before sending the response
        return plainToClass(this.dto, data, {
          // Execute only the fields with Expose()
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
