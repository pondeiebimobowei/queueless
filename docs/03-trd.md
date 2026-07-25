# QueueLess — Technical Requirements Document (TRD)

Version: 1.0
Status: Draft

## Purpose
Define the technical architecture for the QueueLess MVP to enable rapid implementation by a solo founder or small team while remaining maintainable.

# Architecture Principles
- Mobile-first
- Modular monolith
- API-first
- Event-driven where beneficial
- Strong typing
- Simplicity over premature optimization

# Technology Stack
## Mobile
- React Native
- Zustand
- React Navigation
- Axios
- Zod

## Backend
- NestJS
- Prisma ORM
- PostgreSQL
- WebSockets (Socket.IO)
- BullMQ (future background jobs)

## Infrastructure
- Docker
- Coolify
- Cloudflare
- GitHub Actions
- Sentry
- PostHog

# Backend Modules
- Auth
- Businesses
- Staff
- Queues
- Customers
- Notifications
- Analytics

# Authentication
- Firebase Authentication
- JWT validation in NestJS
- Role-based authorization (Owner, Staff)

# Database
PostgreSQL with Prisma.

Core models:
- Business
- Staff
- Customer
- Queue
- QueueEntry
- ServiceSession
- Notification

Pricing data:
- Services include `priceAmount` and `priceCurrency` for analytics and receipt-style reporting.

# API
REST for CRUD.
WebSockets for:
- Queue updates
- Position updates
- Staff actions

# Notification Architecture
Firebase Cloud Messaging.
Events:
- Joined
- Near turn
- Called
- Skipped

# Realtime Requirements
Clients subscribe to business queue channel.
Broadcast queue state changes.

# ETA Calculation

QueueLess uses a service-level rolling estimate that is recalculated as queue state changes.

Baseline approach:
- Start with `estimatedDurationMinutes` for the selected service.
- Estimate wait time as `estimatedDurationMinutes * number of customers ahead in the session`.
- Refine over time using completed service durations when data is available.

Recalculation triggers:
- Customer joins or leaves
- Customer is called, skipped, recalled, or completed
- Staff availability changes
- Queue session status changes

Notes:
- ETA should be treated as a live estimate, not a guaranteed appointment time.
- The same algorithm should be used by API responses and WebSocket broadcasts so the UI stays consistent.

# File Storage
Cloud object storage for logos/profile images.

# Security
- HTTPS only
- JWT validation
- Input validation
- Rate limiting
- Audit logging
- Secrets via environment variables

# Scalability
- Modular monolith first
- Horizontal API scaling later
- Redis for websocket adapter later
- Read replicas only when required

# Monitoring
- Sentry
- Health endpoint
- Structured logs
- PostHog analytics

# CI/CD
GitHub Actions:
- Lint
- Test
- Build
- Docker image
- Deploy to Coolify

# Coding Standards
- Strict TypeScript
- No business logic in controllers
- Services contain business rules
- Repositories isolated through Prisma
- DTO validation using class-validator

# Non-functional Requirements
- API p95 < 500ms
- Crash-free sessions >99%
- Daily backups
- Zero hardcoded secrets

# Risks
- Notification delivery reliability
- Queue synchronization
- Offline edge cases

# Future Extensions
- Redis
- Background workers
- Multi-region
- Event bus
- Microservices only when operationally justified
