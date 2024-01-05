import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { Observable, catchError, tap } from "rxjs";
import { UnauthorizedError } from "../types/UnauthorizedError";

@Injectable()
export class UnauthorizedInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(catchError((error: any) => {
			if(error instanceof UnauthorizedError) {
				throw new UnauthorizedException(error.message);
			}

			throw error;
		}))
	}
}
