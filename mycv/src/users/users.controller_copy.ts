/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }
  @Post('/signup/many')
  createUserMany(@Body() body: CreateUserDto[]) {
    console.log(body);
    
    for (const dto of body) {
      console.log(dto.email);
      console.log(dto.password);
      this.usersService.create(dto.email, dto.password);
      
    }
  }
}
