# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm run start:dev          # Dev server with watch mode
pnpm run build              # Compile to ./dist

pnpm run test               # Unit tests
pnpm run test:watch         # Unit tests in watch mode
pnpm run test:e2e           # End-to-end tests
pnpm run test:cov           # Coverage report
npx jest --testPathPattern items.service  # Run a single test file

pnpm run lint               # ESLint with auto-fix
pnpm run format             # Prettier
```

## Environment

Requires a `.env` file at the project root:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=your_database_name
POSTGRES_USERNAME=your_username
POSTGRES_PASSWORD=your_password
PORT=3000  # optional
```

## Architecture

`ConfigModule` is registered globally in `AppModule` — feature modules do not need to import it.

`DatabaseModule` sets up the TypeORM connection using `TypeOrmModule.forRootAsync` with `autoLoadEntities: true`, so entities registered via `TypeOrmModule.forFeature()` in any feature module are automatically picked up — they do not need to be listed in `DatabaseModule`.

`synchronize: true` is set in `DatabaseModule` — TypeORM auto-migrates the schema on startup. This must be disabled before production use.

### Adding a new feature module

1. Create `src/<feature>/<feature>.module.ts` and register the entity with `TypeOrmModule.forFeature([Entity])`.
2. Inject `EntityManager` directly into the service (not a repository) — this is the established pattern in `ItemsService`.
3. Import the feature module in `AppModule`.

### Entity pattern

Entities use a partial-object constructor (`Object.assign(this, item)`) to allow instantiation from DTOs:

```ts
constructor(item: Partial<Item>) {
  Object.assign(this, item);
}
```

Use this pattern for all new entities.
