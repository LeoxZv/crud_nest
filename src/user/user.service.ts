import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(user: CreateUserDto) {
    const newUser = this.userRepository.create(user as Partial<User>);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find({ relations: ['tasks'] });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (user == null) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id).then((result) => {
      if (result.affected === 0) {
        throw new HttpException(
          `User with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return { message: 'User deleted successfully' };
    });
  }
}
