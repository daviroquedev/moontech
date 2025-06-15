import { Controller, Post, Body, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LogsService } from '../logs/logs.service';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private logsService: LogsService, 
  ) {}

  @Post('login')
  async signIn(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.contrasena);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }
    const accessToken = await this.authService.login(user);
    return { accessToken };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: ExpressRequest & { user: { userId: string } }) {
    await this.logsService.createLog(req.user.userId, false);
    return { message: 'Cierre de sesión exitoso y registrado.' };
  }
}
