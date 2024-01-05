import { CallHandler, ConflictException, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, catchError } from "rxjs";
import { ConflictError } from "../types/ConflictError";

@Injectable()
export class ConflicInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
		return next.handle().pipe(catchError(error => {
			if(error instanceof ConflictError) {
				throw new ConflictException(error.message);
			}

			throw error;
		}))
	}
}
