import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, catchError } from "rxjs";
import { isPrismaError } from "../utils/is-prisma-error.util";

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		return next.handle().pipe(catchError(error => {
			if(isPrismaError(error)) {
			}
			throw error;
		}));
	}
}
