# AGENTS.md

# QueueLess AI Engineering Guide

## Mission
Build QueueLess as a mobile-first, production-quality SaaS. Optimize for clarity, maintainability, and rapid iteration.

## Product Context
- React Native apps: Business and Customer
- Backend: NestJS
- Database: PostgreSQL + Prisma
- Architecture: Modular monolith
- APIs: REST + WebSockets

## Core Principles
1. Simplicity first.
2. Strong typing everywhere.
3. Feature-first architecture.
4. Reuse before creating.
5. Never sacrifice maintainability for speed.

## Folder Structure
/apps
  business_app
  customer_app
  backend
/packages
  shared_ui
  shared_models
  shared_utils
/docs

## Coding Standards
- Never use `any`.
- Avoid duplicated logic.
- Controllers are thin.
- Services contain business logic.
- Validate all inputs.
- Prefer immutable data.

## React Native
- Zustand
- React Navigation
- Feature-based folders
- Reusable components
- Design tokens only

## Backend
- NestJS modules
- Prisma repositories
- DTO validation
- UUID primary keys
- REST for CRUD
- WebSockets for realtime queue events

## API Rules
- Version endpoints under /api/v1
- Consistent error responses
- Idempotent where appropriate

## Database
- PostgreSQL
- Soft deletes when appropriate
- createdAt/updatedAt on entities
- Scope operational queries by businessId

## Testing
- Unit tests for business logic
- Integration tests for APIs
- Manual QA for critical flows

## Performance
- Avoid N+1 queries
- Paginate collections
- Lazy load long lists
- Cache only when necessary

## Security
- HTTPS
- JWT validation
- No secrets in source
- Sanitize inputs

## Git
- Conventional commits
- Small pull requests
- One feature per branch

## Documentation
Update docs for:
- New APIs
- Schema changes
- User flows
- Breaking changes

## AI Assistant Rules
- Read existing code before generating.
- Preserve architecture.
- Do not invent new patterns if one exists.
- Ask for clarification if requirements conflict.
- Prefer editing existing components over creating duplicates.
- Keep files cohesive and focused.
- Generate production-ready code with comments only where necessary.

## Definition of Done
- Acceptance criteria met
- Tests pass
- Lint passes
- Docs updated
- Ready to deploy
