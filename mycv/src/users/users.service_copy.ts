/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository} from '@nestjs/typeorm';
import { User } from './user.entity';
import { QueryDto } from './dtos/query-dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOne({ 
      where: { 
        id: id 
      } 
    });
  }

  find(email: string) {
    return this.repo.find({ where: { email: email }});
  }

  findOptional(dto: QueryDto){

    let query = this.repo
    .createQueryBuilder("user");

    query = this.buildOrAnd(dto, query);

    // run query
    const users = query.getMany();
    return users;

  }

  buildOrAnd(dto: QueryDto, query: SelectQueryBuilder<User>){

    if(dto.type == "or"){

      if(dto.email){
        query.orWhere("user.email LIKE :email", { email: '%' + dto.email + '%' })
      }
      
      if(dto.pwd){
        query.orWhere("user.password LIKE :pwd", { pwd: '%' + dto.pwd + '%' })
      }
    }
    else if(dto.type == "and"){
      if(dto.email){
        query.andWhere("user.email LIKE :email", { email: '%' + dto.email + '%' })
      }
      
      if(dto.pwd){
        query.andWhere("user.password LIKE :pwd", { pwd: '%' + dto.pwd + '%' })
      }
    } 
    else if(dto.type == "all"){
      return query;
    }
    return query;
  }

  //update() {}

  //remove() {}
}
