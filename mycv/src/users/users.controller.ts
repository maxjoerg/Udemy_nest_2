/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Body, Controller, Query, Post, NotFoundException, Get, Param } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { QueryDto } from './dtos/query-dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }

  @Get('/user/:id')
  async getMessage(@Param('id') id: number) {
    console.log(id)
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException('User does nor exist');
    }

    return user;
  }

  //@Get('/user/findByFilter')
  @Get('/user/')
    async findByFilter(@Query() query: QueryDto)        
    {
      console.log(query);
      const user = await this.usersService.findOptional(query );

      if (user.length == 0) {
        throw new NotFoundException('User does not exist');
      }
      return user;
    }
}
