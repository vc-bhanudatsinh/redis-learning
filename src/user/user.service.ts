import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/createUser.dto';
import { ResponseHandler } from '../utils/responseHandler';
import { successMessage } from '../common/config/messages.config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAllUser() {
    const users = await this.userModel.find({});
    return ResponseHandler.success(
      HttpStatus.OK,
      successMessage.USER_FETCHED,
      users,
    );
  }

  async createUser(createUser: CreateUserDto) {
    await this.userModel.create(createUser);

    return ResponseHandler.success(
      HttpStatus.CREATED,
      successMessage.USER_CREATED,
    );
  }

  async getUser(id: string) {
    console.log('---------------------');
    const user = await this.userModel.findById(id);
    return ResponseHandler.success(
      HttpStatus.OK,
      successMessage.USER_FETCHED,
      user,
    );
  }
}
