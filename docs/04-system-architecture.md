# QueueLess — System Architecture

Version: 1.0

## Overview

QueueLess is a mobile-first SaaS platform composed of React Native mobile clients (BUsiness and Customer), a NestJS backend, PostgreSQL database, and Firebase services for push notifications.

## High-Level Architecture

```text
React Native Mobile App(s)
          |
          +---------- HTTPS -------+
                     REST API
                        |
              NestJS Modular Monolith
      +---------+---------+---------+
      | Auth    | Queue   | Staff   |
      | Business| Customer|Analytics|
      +---------+---------+---------+
                |
             Prisma ORM
                |
           PostgreSQL
                |
      WebSocket Gateway (Realtime)
                |
 Firebase Cloud Messaging (Push)
```

## Core Principles

- Mobile-first
- Feature-first on the client
- Modular monolith on the backend
- API-first
- Strong typing
- Event-driven internally
- Simplicity before scale

## Client Layer

### Mobile App
- Auth and onboarding
- Queue entry and live queue status
- Business discovery and selection
- Notifications
- Check-in and QR flows

## Backend Modules

- Auth
- Businesses
- Staff
- Queues
- Customers
- Notifications
- Analytics

Each module contains:
- Controller
- Service
- DTOs
- Prisma access
- Validation

## Realtime

WebSockets broadcast:
- Queue updates
- Customer position
- Queue actions
- Staff availability
- Business status changes

## Mobile Client Structure

The mobile app uses a feature-first layout with clean layers:

```text
src/
  app/
  core/
  shared/
  features/
```

### App Layer
- Navigation
- Providers
- Global hooks
- App config

### Core Layer
- API client
- Auth token handling
- Storage
- Notifications
- WebSocket client
- Permissions

### Shared Layer
- Reusable UI
- Utility helpers
- Theme and constants
- Shared types

### Features Layer
- Auth
- Queues
- Businesses
- Profile
- Notifications
- Settings

Feature folders own their UI, hooks, API calls, local store, and types.

## Data Layer

Database:
- PostgreSQL

ORM:
- Prisma

Core entities:
- Business
- Staff
- Customer
- QueueEntry
- ServiceSession
- Notification

## Infrastructure

- Docker
- Coolify
- Cloudflare
- GitHub Actions
- Sentry
- PostHog

## Security

- HTTPS everywhere
- Firebase Authentication
- JWT verification
- Input validation
- Rate limiting
- Audit logging

## Deployment

Environments:
- Local
- Staging
- Production

Deployment flow:
GitHub → GitHub Actions → Docker Image → Coolify → Health Check

## Scalability Roadmap

MVP:
- Single PostgreSQL instance
- Single NestJS application

Growth:
- Redis
- Horizontal API scaling
- Read replicas
- Background workers

## Monitoring

- Health endpoint
- Structured logs
- Sentry
- PostHog analytics

## Architecture Decisions

- Prefer modular monolith over microservices.
- Use REST for CRUD and WebSockets for realtime queue updates.
- Organize the mobile client by feature first, not by generic screen buckets.
- Keep server state in TanStack Query, client UI state in Zustand, and form state in React Hook Form.
- Optimize for rapid iteration and maintainability.
