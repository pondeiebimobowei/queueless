# QueueLess — Engineering Standards

**Version:** 1.0

## Purpose

This document defines the engineering standards for QueueLess to ensure consistency, maintainability, and rapid AI-assisted development.

---

# Engineering Principles

- Build for clarity before cleverness.
- Prefer simple solutions.
- Optimize for maintainability.
- Ship small, iterate often.
- Keep business logic isolated.

---

# Repository Structure

/apps
  /mobile
    /src
      /app
      /core
      /shared
      /features
  /mobile-_customer
    /src
      /app
      /core
      /shared
      /features
  /web
  /api

/packages
  /shared_models
  /shared_ui
  /shared_utils

/docs

---

# Branch Strategy

- main (production)
- develop (integration)
- feature/*
- fix/*
- chore/*

Use short-lived feature branches.

---

# Commit Convention

Conventional Commits:

- feat:
- fix:
- docs:
- refactor:
- test:
- chore:

Example:
feat(queue): add customer recall action

---

# Code Style

## TypeScript

- Enable strict analysis.
- Prefer const constructors.
- Avoid dynamic.
- Favor composition over inheritance.

## TypeScript

- strict: true
- no any
- Explicit return types for public APIs.
- ESLint + Prettier enforced.

---

# Architecture Rules

- Modular monolith.
- Feature-first folders.
- Mobile app code belongs in `apps/mobile/src`, not in broad `screens` or `services` buckets.
- Features own their UI, hooks, API functions, local store, and types.
- Core owns cross-cutting concerns like API, auth, storage, notifications, sockets, and permissions.
- Shared owns reusable UI and helpers only.
- Controllers remain thin.
- Services contain business logic.
- No database queries in controllers.
- No circular dependencies.

---

# API Standards

- REST for CRUD.
- WebSockets for realtime.
- Version all endpoints (/api/v1).
- Validate all input.
- Consistent error format.

---

# State Management

React Native:
- TanStack Query for server state
- Zustand for small client state
- React Hook Form for forms
- Immutable state where practical

Do not store server state locally beyond cache requirements.

---

# Database

- PostgreSQL
- Prisma ORM
- UUID primary keys
- Soft deletes where appropriate
- createdAt / updatedAt on all entities

---

# Testing

Required:
- Unit tests for business logic
- Integration tests for APIs
- Manual QA for user flows

Avoid snapshot tests unless justified.

---

# Documentation

Every feature must include:
- Purpose
- Acceptance criteria
- API updates
- Migration notes (if applicable)

---

# Performance

Targets:
- API p95 < 500ms
- App startup < 2s
- 60 FPS animations

Avoid unnecessary rebuilds and N+1 queries.

---

# Security

- HTTPS only
- JWT validation
- Input validation
- Rate limiting
- Environment variables for secrets
- Principle of least privilege

---

# Logging

Use structured logs.

Never log:
- Passwords
- Tokens
- Sensitive personal information

---

# Error Handling

- Return meaningful error messages.
- Surface actionable feedback to users.
- Fail gracefully.

---

# CI/CD

GitHub Actions:
1. Lint
2. Test
3. Build
4. Docker image
5. Deploy to staging
6. Promote to production

---

# Dependency Management

Before adding a dependency:
- Is it maintained?
- Is it necessary?
- Can existing tooling solve the problem?

---

# AI-Assisted Development

- Generate code in small increments.
- Review AI output before merging.
- Never merge unreviewed AI code.
- Keep prompts and design docs aligned.

---

# Code Review Checklist

- Correctness
- Simplicity
- Naming
- Tests
- Documentation
- Performance
- Security

---

# Definition of Done

A task is complete when:
- Acceptance criteria met
- Tests pass
- Documentation updated
- Reviewed
- Deployable
