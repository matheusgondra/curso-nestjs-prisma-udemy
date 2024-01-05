import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { UnauthorizedInterceptor } from "./common/errors/interceptors/unauthorized.interceptor";
import { NotFoundInterceptor } from "./common/errors/interceptors/notfound.interceptor";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true
		})
	);
	app.useGlobalInterceptors(
		new UnauthorizedInterceptor(),
		new NotFoundInterceptor()
	);
	await app.listen(process.env.PORT || 3000);
}
bootstrap();
