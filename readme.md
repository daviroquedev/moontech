# Prueba Técnica Moontech (Full Stack) - Simulador Integrado de AGV

Este proyecto fue desarrollado para cumplir con todos los requisitos de la Prueba Técnica Full Stack de Moontech. La aplicación consiste en un backend robusto construido con **NestJS** y un frontend reactivo con **Angular**, completamente containerizados con Docker.

Además de los requisitos básicos, el proyecto integra una funcionalidad de **simulador de AGV (Vehículo Guiado Automáticamente)** en tiempo real, accesible tras la autenticación del usuario, demostrando la integración de una API REST segura con comunicación vía WebSockets.

---

## ✅ Cumplimiento de Requisitos

El proyecto implementa con éxito todos los puntos obligatorios y valorables del desafío.

### Requisitos del Backend (Node: NestJS)

-   [x] **Conexión a Gestor de Bases de Datos:** La aplicación se conecta a una instancia de **MongoDB** gestionada por Docker.
-   [x] **Colección de Documentos de Usuarios:**
    -   [x] `nombre`: Texto alfanumérico.
    -   [x] `contraseña`: Texto alfanumérico (almacenado de forma segura con hash).
    -   [x] `email`: Texto alfanumérico y único.
    -   [x] `activo`: Booleano.
-   [x] **Colección de Documentos de Log de Conexiones:**
    -   [x] `fecha`: Fecha de conexión/desconexión.
    -   [x] `usuario`: Referencia al usuario.
    -   [x] `login`: Booleano (`true` para login, `false` para logout).
-   [x] **Funcionalidad:**
    -   [x] **Crear/Actualizar/Eliminar usuarios:** Implementado a través de una API REST protegida.
    -   [x] **Autenticación de usuarios existentes:** Implementada con un endpoint de login seguro.
    -   [x] **Creación de log de conexión:** Los logs se crean automáticamente al iniciar y cerrar sesión.

### Requisitos del Frontend (Angular)

-   [x] **Pantalla de inicio de sesión:** Una página `/login` que permite a los usuarios autenticarse.
-   [x] **Pantalla de mantenimiento de usuarios (Formulario CRUD):** Una página `/admin/users` (protegida) que permite visualizar, agregar, editar y eliminar usuarios.
-   [ ] **Opcional - Pantalla de visualización de conexiones:** Esta funcionalidad está pendiente de implementación.

---

## ✨ Puntos Valorables Implementados

Este proyecto fue construido con foco en las mejores prácticas modernas de desarrollo, cubriendo todos los puntos valorables:

-   [x] **Conexión con WebSockets:** La comunicación para el simulador de AGV es en tiempo real usando Socket.IO, integrado de forma modular en NestJS mediante un **Gateway**.
-   [x] **Uso de Estrategias de Seguridad (JWT):** La autenticación se basa en JSON Web Tokens. El login genera un token y las rutas protegidas lo validan usando una **Estrategia JWT** con Passport.js.
-   [x] **Población de Datos Iniciales:** Un **"seeder"** se ejecuta al iniciar el backend para asegurar que un usuario `admin` estándar exista siempre en la base de datos.
-   [x] **Manejo de Variables de Entorno:** La aplicación usa un archivo `.env` para gestionar variables sensibles (como la cadena de conexión a MongoDB y el secreto JWT), cargadas de forma segura mediante el módulo `@nestjs/config`.
-   [x] **Encriptación de Contraseñas:** Las contraseñas nunca se guardan en texto plano. Se usa la librería **`bcryptjs`** para crear un hash seguro de todas las contraseñas antes de almacenarlas.
-   [x] **API Rest:** El backend expone una API REST clara y bien definida para la autenticación y el CRUD de usuarios.
-   [x] **Gestión de Tokens (JWT) en el Frontend:** El `AuthService` en Angular maneja el ciclo de vida del token, almacenándolo en `localStorage`.
-   [x] **Uso de Interceptors:** Un `HttpInterceptor` se usa para anexar automáticamente el token JWT a todas las solicitudes hacia la API protegida.
-   [x] **Uso de Route Guards:** Un `CanActivate` protege las rutas del frontend, redirigiendo a usuarios no autenticados a la página de login.
-   [x] **Formularios Reactivos de Angular:** Los formularios de login y de creación/edición de usuarios están construidos con `ReactiveFormsModule`, incluyendo validación en tiempo real.

---

## 🚀 Tecnologías Utilizadas

-   **Backend:** NestJS (sobre Express), TypeScript
-   **Frontend:** Angular 18, TypeScript
-   **Base de Datos:** MongoDB
-   **Comunicación en Tiempo Real:** Socket.IO
-   **Autenticación:** Passport.js, JSON Web Token (JWT)
-   **Seguridad:** BcryptJS
-   **Containerización:** Docker & Docker Compose
-   **Servidor Web (Frontend):** Nginx

---

## ⚙️ Cómo Ejecutar

El proyecto está totalmente containerizado. El único prerrequisito es tener **Docker** y **Docker Compose** instalados.

1.  Clona este repositorio.
2.  Abre una terminal en la carpeta raíz del proyecto.
3.  Ejecuta el siguiente comando para construir las imágenes e iniciar los contenedores:
    ```bash
    docker-compose up --build
    ```
4.  Espera a que termine el proceso.
5.  Accede a **`http://localhost:4200`** en tu navegador.

### Credenciales de Administrador

Usa las siguientes credenciales para el primer inicio de sesión:
* **Email:** `admin@admin.com`
* **Contraseña:** `password123`
