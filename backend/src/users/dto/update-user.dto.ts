import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Juan Pérez', description: 'Nombre completo del usuario' })
  nombre?: string;

  @ApiPropertyOptional({ example: 'juan.perez@ejemplo.com', description: 'Correo electrónico del usuario' })
  email?: string;

  @ApiPropertyOptional({ example: 'nuevaContraseña456', description: 'Contraseña del usuario' })
  contrasena?: string;

  @ApiPropertyOptional({ example: true, description: 'Estado de la cuenta (activo/inactivo)' })
  activo?: boolean;
}