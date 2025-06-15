import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'usuario@ejemplo.com', description: 'Correo electrónico del usuario' })
  email: string;

  @ApiProperty({ example: 'exemplo123', description: 'Contraseña del usuario' })
  contrasena: string;
}