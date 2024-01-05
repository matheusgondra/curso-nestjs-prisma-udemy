import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from "@nestjs/common";
import { Observable, catchError } from "rxjs";
import { NotFoundError } from "../types/NotFoundError";

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
		return next.handle().pipe(catchError(error => {
			if(error instanceof NotFoundError) {
				throw new NotFoundException(error.message);
			}

			throw error;
		}))
	}
}
