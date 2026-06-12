# nestjs-typeorm

A RESTful API built with NestJS and TypeORM, demonstrating a clean modular architecture with PostgreSQL as the database.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [NestJS](https://nestjs.com/) v11 |
| Language | TypeScript v5.7 |
| ORM | [TypeORM](https://typeorm.io/) v1 |
| Database | PostgreSQL (via `pg` v8) |
| Config | `@nestjs/config` (`.env` based) |
| Runtime | Node.js |
| Package Manager | [pnpm](https://pnpm.io/) |
| Testing | Jest v30 + Supertest |
| Linting | ESLint v9 + Prettier |

---

## Project Structure

```
nestjs-typeorm/
├── src/
│   ├── app.module.ts               # Root module — wires ConfigModule, DatabaseModule, ItemsModule
│   ├── main.ts                     # Entry point — bootstraps NestJS app on port 3000
│   │
│   ├── database/
│   │   └── database.module.ts      # TypeORM async connection setup using ConfigService
│   │
│   └── items/
│       ├── dto/
│       │   ├── create-item.dto.ts  # DTO for creating an item
│       │   └── update-item.dto.ts  # DTO for updating an item
│       ├── entities/
│       │   └── item.entity.ts      # TypeORM entity — maps to the `item` table
│       ├── items.controller.ts     # REST controller — handles HTTP requests for /items
│       ├── items.controller.spec.ts
│       ├── items.module.ts         # Items feature module
│       ├── items.service.ts        # Business logic — interacts with the database
│       └── items.service.spec.ts
│
├── test/
│   └── jest-e2e.json               # Jest config for end-to-end tests
│
├── dist/                           # Compiled output (generated on build)
├── nest-cli.json                   # NestJS CLI configuration
├── tsconfig.json                   # TypeScript compiler options
├── tsconfig.build.json             # TypeScript config for production builds
├── eslint.config.mjs               # ESLint flat config
├── .prettierrc                     # Prettier formatting rules
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

---

## API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/items` | Create a new item |
| `GET` | `/items` | Retrieve all items |
| `GET` | `/items/:id` | Retrieve a single item by ID |
| `PATCH` | `/items/:id` | Update an item by ID |
| `DELETE` | `/items/:id` | Delete an item by ID |

### POST `/items` — Request Body

```json
{
  "name": "Sample Item",
  "public": true
}
```

---

## Item Entity

| Column | Type | Details |
|---|---|---|
| `id` | `number` | Auto-generated primary key |
| `name` | `string` | Required |
| `public` | `boolean` | Defaults to `true` |

---

## Environment Variables

Create a `.env` file in the project root with the following keys:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=your_database_name
POSTGRES_USERNAME=your_username
POSTGRES_PASSWORD=your_password

# Optional
PORT=3000
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- A running PostgreSQL instance

### Installation

```bash
pnpm install
```

### Running the App

```bash
# Development
pnpm run start

# Watch mode (auto-restart on changes)
pnpm run start:dev

# Production
pnpm run start:prod
```

The app listens on `http://localhost:3000` by default (or the port set in `PORT`).

> `synchronize: true` is enabled — TypeORM will automatically create/update database tables to match entity definitions on every startup. Disable this in production.

---

## Testing

```bash
# Unit tests
pnpm run test

# Unit tests in watch mode
pnpm run test:watch

# End-to-end tests
pnpm run test:e2e

# Test coverage report
pnpm run test:cov
```

---

## Build

```bash
pnpm run build
```

Compiled output is placed in the `./dist` directory.

---

## Code Quality

```bash
# Lint and auto-fix
pnpm run lint

# Format with Prettier
pnpm run format
```

---

## Architecture Overview

```
HTTP Request
     │
     ▼
ItemsController        ← Handles routing, request/response
     │
     ▼
ItemsService           ← Business logic
     │
     ▼
EntityManager (TypeORM) ← Database operations
     │
     ▼
PostgreSQL (`item` table)
```

The app follows NestJS's modular architecture:

- **AppModule** — root module, imports global config and feature modules
- **DatabaseModule** — sets up the TypeORM connection asynchronously using environment variables via `ConfigService`
- **ItemsModule** — self-contained feature module with its own controller, service, entity, and DTOs
