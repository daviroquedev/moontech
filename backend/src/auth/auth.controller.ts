import { Controller, Post, Body, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LogsService } from '../logs/logs.service';
import { Request as ExpressRequest } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private logsService: LogsService, 
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 201, description: 'Token de acceso generado correctamente.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cerrar sesión' })
  @ApiResponse({ status: 200, description: 'Cierre de sesión exitoso y registrado.' })
  async logout(@Request() req: ExpressRequest & { user: { userId: string } }) {
    await this.logsService.createLog(req.user.userId, false);
    return { message: 'Cierre de sesión exitoso y registrado.' };
  }
}