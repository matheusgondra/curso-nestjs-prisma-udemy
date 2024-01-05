import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { NotFoundError } from "src/common/errors/types/NotFoundError";
import { UserEntity } from "./entities/user.entity";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
		return await this.usersService.create(createUserDto);
	}

	@Get()
	async findAll(): Promise<UserEntity[]> {
		return await this.usersService.findAll();
	}

	@Get(":id")
	async findOne(@Param("id") id: string): Promise<UserEntity> {
		const user = await this.usersService.findOne(+id);
		if(!user) {
			throw new NotFoundError("User not found");
		}

		return user;
	}

	@Patch(":id")
	async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
		return await this.usersService.update(+id, updateUserDto);
	}

	@Delete(":id")
	async remove(@Param("id") id: string): Promise<UserEntity> {
		return await this.usersService.remove(+id);
	}
}
