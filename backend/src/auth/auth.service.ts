import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LogsService } from '../logs/logs.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly logsService: LogsService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      console.warn('Usuario no encontrado en la base de datos.');
      return null;
    }

    
    const isPasswordMatching = await bcrypt.compare(pass, user.contrasena);

    if (!isPasswordMatching) {
     
      return null;
    }


    const { contrasena, ...result } = user.toObject();
    return result;
  }

  async login(user: any) {
    const payload = { nombre: user.nombre, sub: user._id, email: user.email };
    const access_token = this.jwtService.sign(payload);

    await this.logsService.createLog(user._id, true);

    return {
      access_token,
    };
  }
}