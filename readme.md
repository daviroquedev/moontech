# Prueba Técnica Moontech (Full Stack) - Simulador Integrado de AGV

Este proyecto fue desarrollado para cumplir con todos los requisitos de la Prueba Técnica Full Stack de Moontech. La aplicación consiste en un backend robusto construido con **NestJS** y un frontend reactivo con **Angular**, completamente containerizados con Docker.

Además de los requisitos básicos, el proyecto integra una funcionalidad de **simulador de AGV (Vehículo Guiado Automáticamente)** en tiempo real, accesible tras la autenticación del usuario, demostrando la integración de una API REST segura con comunicación vía WebSockets.

---

## ⚙️ Cómo Ejecutar

1. Clonar este repositorio.  
2. Abrir una terminal en la carpeta raíz.  
3. Ejecutar:  
    ```bash
    docker-compose up --build
    ```
4. Acceder a `http://localhost:4200`.

 ---

## Seeder de Datos Iniciales

El backend incluye un **seeder** que se ejecuta automáticamente al iniciar la aplicación y garantiza un usuario administrador con:

- **Email:** `admin@admin.com`  
- **Contraseña:** `password123`  


---

## 📖 Documentación API REST con Swagger

La documentación swagger está disponible en:  
[http://localhost:3000/api/docs](http://localhost:3000/api/docs)  

---

## Rutas de la API REST

Todas las rutas, excepto la de login, están protegidas con autenticación JWT.

### Usuarios (protegida)

| Método | Ruta              | Descripción                    |
|--------|-------------------|-------------------------------|
| POST   | `/api/users`      | Crear un nuevo usuario         |
| GET    | `/api/users`      | Obtener todos los usuarios     |
| PUT    | `/api/users/{id}` | Actualizar un usuario existente|
| DELETE | `/api/users/{id}` | Eliminar un usuario por ID     |

### Autenticación

| Método | Ruta           | Descripción               |
|--------|----------------|---------------------------|
| POST   | `/api/auth/login`  | Iniciar sesión (pública) |
| POST   | `/api/auth/logout` | Cerrar sesión (protegida)|

### Registros

| Método | Ruta          | Descripción                       |
|--------|---------------|-----------------------------------|
| GET    | `/api/logs`   | Obtener todos los registros (protegida) |

---

## Funcionalidad en Tiempo Real con WebSocket

- **Simulador AGV:** Comunicación en tiempo real entre backend y la pantalla `/agv` para controlar el simulador mediante WebSockets.  
- **Monitoreo de Logs:** En la pantalla `/logs` se muestran registros almacenados y eventos de login/logout en tiempo real via WebSocket.

---

## Diseño Responsive

La aplicación es completamente responsive para dispositivos móviles y de escritorio, excepto la pantalla `/agv` (Simulador AGV) que mantiene un diseño fijo para una visualización óptima.

---

## ✅ Cumplimiento de Requisitos

El proyecto implementa con éxito todos los puntos obligatorios y valorables del desafío.

### Backend (Node: NestJS)

-   [x] Conexión a MongoDB con Docker.  
-   [x] Modelos de usuarios y logs completos y seguros.  
-   [x] API REST con CRUD de usuarios y autenticación JWT.  
-   [x] Registro automático de logs en eventos de login/logout.  
-   [x] Documentación automática con Swagger.

### Frontend (Angular)

-   [x] Pantalla de login segura.  
-   [x] CRUD completo de usuarios.  
-   [x] Simulador AGV en tiempo real con WebSocket.  
-   [x] Protección de rutas con Guards.  
-   [x] Formulario reactivo con validaciones.  
-   [x] Interceptors para manejo automático del token JWT.

---

## 🚀 Tecnologías Utilizadas

-   **Backend:** NestJS (Express), TypeScript  
-   **Frontend:** Angular 18, TypeScript  
-   **Base de Datos:** MongoDB  
-   **Comunicación en Tiempo Real:** Socket.IO  
-   **Autenticación:** Passport.js, JWT  
-   **Seguridad:** BcryptJS  
-   **Containerización:** Docker & Docker Compose  
-   **Servidor Frontend:** Nginx  

---

## Units Test

Actualmente, solo se ha cubierto aproximadamente el 44% del código con tests unitarios.

![image](https://github.com/user-attachments/assets/2fe0edd1-9f5a-4d70-b765-a8b25fb66f70)

---

## 📋 Convenciones para Commits (Conventional Commits)

Este proyecto sigue la convención de **Conventional Commits** para mantener un historial de cambios claro, legible y automatizable. Esta práctica ayuda a que los mensajes de commit sean uniformes y facilita la generación automática de versiones y changelogs.

---

## 🚧 Puntos de Mejora

- Implementar evasión de obstáculos en el simulador AGV para mayor realismo y funcionalidad.  
- Mejorar la responsividad de la pantalla `/agv` para dispositivos móviles y distintas resoluciones.  
- Mostrar el nombre de usuario en los registros (`logs`) en lugar de solo el ID para facilitar lectura y auditoría.  
- Completar y aumentar la cobertura de tests unitarios para mayor calidad y robustez del código.

---

https://github.com/user-attachments/assets/cb0da6bd-1a04-486b-9805-bb46a708a82e




