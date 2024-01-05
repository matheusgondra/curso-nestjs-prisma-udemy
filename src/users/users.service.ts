import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersRepository } from "./repositories/users.repository";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	create(createUserDto: CreateUserDto): Promise<UserEntity> {
		return this.usersRepository.create(createUserDto);
	}

	findAll(): Promise<UserEntity[]> {
		return this.usersRepository.findAll();
	}

	findOne(id: number): Promise<UserEntity> {
		return this.usersRepository.findOne(id);
	}

	update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
		return this.usersRepository.update(id, updateUserDto);
	}

	remove(id: number): Promise<UserEntity> {
		return this.usersRepository.remove(id);
	}
}
