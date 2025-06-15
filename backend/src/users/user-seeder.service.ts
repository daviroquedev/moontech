import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class UserSeederService implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  /**
   * El método onModuleInit() es un "hook del ciclo de vida" de NestJS.
   * Se ejecuta automáticamente tan pronto como se inicializa el módulo (UsersModule).
   */
  async onModuleInit() {
    console.log('Ejecutando el seeder de usuarios...');
    await this.seedAdminUser();
  }

  private async seedAdminUser() {
    try {
      const adminExists = await this.usersService.findOneByEmail('admin@admin.com');

      if (!adminExists) {
        console.log('Creando el usuario administrador por defecto...');
        const adminData = {
          nombre: 'Administrador',
          email: 'admin@admin.com',
          contrasena: 'password123',
          activo: true,
        };
       
        await this.usersService.create(adminData);

        console.log('✅ ¡Usuario administrador creado con éxito!');
      } else {
        console.log('ℹ️ El usuario administrador ya existe.');
      }
    } catch (error) {
      console.error('❌ Error al ejecutar el seeder de usuario:', error);
    }
  }
}
