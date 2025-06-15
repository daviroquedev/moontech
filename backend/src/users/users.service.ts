import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface DeleteResponse {
  message: string;
}

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(createUserDto.contrasena);
    
    const createdUser = new this.userModel({
      ...createUserDto,
      contrasena: hashedPassword,
    });

    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-contrasena').exec();
  }

  async findOneById(id: string): Promise<User | null> {
    return this.userModel.findById(id).select('-contrasena').exec();
  }

  async findOneByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.contrasena) {
      updateUserDto.contrasena = await this.hashPassword(updateUserDto.contrasena);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .select('-contrasena');

    if (!updatedUser) {
      throw new NotFoundException(`Usuario con el ID "${id}" no encontrado`);
    }

    return updatedUser;
  }

  async remove(id: string): Promise<DeleteResponse> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException(`Usuario con el ID "${id}" no encontrado`);
    }

    return { message: 'Usuario eliminado exitosamente.' };
  }

  private async hashPassword(plainText: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(plainText, salt);
  }
}
