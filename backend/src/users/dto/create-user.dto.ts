import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre completo del usuario' })
  nombre: string;

  @ApiProperty({ example: 'juan.perez@ejemplo.com', description: 'Correo electrónico del usuario' })
  email: string;

  @ApiProperty({ example: 'contraseñaSegura123', description: 'Contraseña del usuario' })
  contrasena: string;

  @ApiPropertyOptional({ example: true, description: 'Estado de la cuenta (activo/inactivo)' })
  activo?: boolean;
}