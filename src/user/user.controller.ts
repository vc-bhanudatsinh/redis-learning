import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { GetUserDetailsDto } from './dtos/getUserDetails.dto';
import { CustomCacheKey } from './customDecorator';

@Controller('user')
@UseInterceptors(CacheInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @CacheKey('users')
  @Get()
  async getAllUsers() {
    return this.userService.getAllUser();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('/:id')
  @CustomCacheKey('id')
  async getUser(@Param() getUserDetailsDto: GetUserDetailsDto) {
    return this.userService.getUser(getUserDetailsDto.id);
  }
}
