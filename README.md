# RAG multi-tenant backend

Backend en NestJS para un servicio de RAG (*retrieval-augmented generation*) multi-empresa: cada empresa tiene sus propios usuarios y, más adelante, sus propios documentos, de modo que las respuestas del asistente solo usan la información de esa empresa.

> **Estado:** en desarrollo. Está hecha la base multi-tenant (empresas, usuarios y autenticación JWT con roles). La ingesta de documentos, los embeddings y las consultas RAG son los siguientes pasos.

## Qué hay hecho

- **Empresas (tenants):** alta y listado, con plan (`basic` por defecto)
- **Usuarios:** asociados a una empresa, contraseña cifrada con bcrypt
- **Autenticación JWT:** el token lleva el id de usuario, su rol y su empresa (`companyId`), y caduca en 1 h
- **Roles y guards:** `user`, `admin` y `superadmin`, con el decorador `@Roles()` para proteger rutas

## Stack

NestJS 11 · TypeScript · TypeORM · PostgreSQL · Passport JWT · bcrypt · Jest

## API

| Método | Ruta | Acceso | Para qué |
| --- | --- | --- | --- |
| POST | `/auth/login` | Público | Obtener un token JWT |
| GET | `/auth/test-admin` | `admin` | Comprobar el guard de roles |
| POST | `/companies` | Público | Crear una empresa |
| GET | `/companies` | Público | Listar empresas |
| GET | `/users/all` | `admin`, `superadmin` | Listar usuarios |
| GET | `/users/profile` | Cualquier rol | Perfil del usuario autenticado |

> El login todavía es de prueba: emite un token de `admin` sin comprobar la contraseña contra la base de datos. Es lo primero que hay que completar antes de usarlo en serio.

## Puesta en marcha

Necesitas Node.js 20+ y PostgreSQL.

```bash
npm install
cp .env.example .env    # rellena tus datos
npm run start:dev       # http://localhost:3000
```

Variables de entorno (ver `.env.example`):

| Variable | Para qué |
| --- | --- |
| `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_NAME` | Conexión a PostgreSQL |
| `JWT_SECRET` | Clave para firmar los tokens |
| `PORT` | Puerto del servidor (3000 por defecto) |

TypeORM crea las tablas automáticamente (`synchronize: true`), algo pensado solo para desarrollo.

## Tests

```bash
npm test          # unitarios
npm run test:e2e  # end-to-end
```

## Próximos pasos

- Login real contra la base de datos y alta de usuarios
- Subida de documentos por empresa y troceado en fragmentos
- Embeddings y búsqueda vectorial (pgvector)
- Endpoint de preguntas que responde con un LLM usando solo los documentos de la empresa

## Autor

Miguel Contreras · [mcontreras.dev](https://www.mcontreras.dev) · [NexuraIA](https://www.nexuraia.com)
