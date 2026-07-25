# QueueLess — Architecture & Product Decision Log (ADR)

**Version:** 1.0
**Purpose:** Record key product and engineering decisions, the rationale behind them, and any alternatives considered. This log serves as the single source of truth for future architectural decisions.

---

# ADR-001: Mobile-First Strategy

**Status:** Accepted

## Decision
Build native mobile applications before any web experience.

## Rationale
- Primary users operate on mobile devices.
- Business owners manage queues from their phones.
- Customers expect mobile notifications and real-time updates.
- Faster path to validation.

## Alternatives
- Responsive web application
- Desktop-first dashboard

---

# ADR-002: Initial Target Market

**Status:** Accepted

## Decision
Launch with multi-station businesses, salons, and similar walk-in service businesses.

## Rationale
- High frequency of walk-in traffic.
- Operational chaos is common.
- Faster sales cycle than healthcare or government.
- Lower compliance burden.

---

# ADR-003: Product Positioning

**Status:** Accepted

## Decision
Position QueueLess as an operational tool rather than simply a queue management app.

## Rationale
- Queue management alone is a commodity.
- Operational insights improve retention.
- Creates expansion opportunities.

---

# ADR-004: MVP Scope

**Status:** Accepted

## Decision
Focus exclusively on the core queue lifecycle.

Included:
- Queue creation
- Join queue
- Leave queue
- Live status
- Queue actions
- Notifications
- Basic analytics

Excluded:
- Appointments
- Payments
- CRM
- Loyalty
- Inventory
- Forecasting

---

# ADR-005: Architecture Style

**Status:** Accepted

## Decision
Use a modular monolith.

## Rationale
- Simpler to develop and maintain.
- Supports rapid iteration.
- Easier for AI-assisted development.

Future migration to microservices only if operationally necessary.

---

# ADR-006: Technology Stack

**Status:** Accepted

Frontend:
- React Native

Backend:
- NestJS

Database:
- PostgreSQL + Prisma

Notifications:
- Firebase Cloud Messaging

Authentication:
- Firebase Authentication

---

# ADR-007: Realtime Communication

**Status:** Accepted

## Decision
Use WebSockets for live queue synchronization.

## Alternatives
- Polling
- Server-Sent Events

Reason:
Provides the best user experience for live queue updates.

---

# ADR-008: Multi-Tenancy

**Status:** Accepted

## Decision
Single database with business-level data isolation.

Every operational table includes:
- businessId

---

# ADR-009: Analytics

**Status:** Accepted

## Decision
Provide lightweight operational analytics in the MVP.

Metrics:
- Customers joined
- Customers served
- Average wait time
- Queue abandonment
- Estimated lost revenue

---

# ADR-010: Authentication

**Status:** Accepted

## Decision
Delegate identity management to Firebase Authentication.

Reason:
Avoid building authentication infrastructure.

---

# ADR-011: Deployment

**Status:** Accepted

Infrastructure:
- Docker
- Coolify
- Cloudflare

Reason:
Low operational overhead.

---

# ADR-012: Repository Strategy

**Status:** Accepted

Monorepo structure.

Benefits:
- Shared models
- Shared UI
- Easier refactoring

---

# ADR-013: State Management

React Native:
Zustand

Reason:
Scalable, testable, and predictable.

---

# ADR-014: API Design

REST for CRUD.
WebSockets for realtime.

Version all endpoints under:
/api/v1

---

# ADR-015: Product Success Metric

Primary KPI:
Weekly Active Businesses.

Supporting KPIs:
- Queue completion rate
- Weekly retention
- Customer abandonment
- Time to first queue

---

# ADR-016: Long-Term Vision

QueueLess evolves into an operating platform for walk-in businesses by adding:
- Appointments
- CRM
- Loyalty
- Staff scheduling
- Payments
- Inventory
- Business intelligence

---

# Decision Review Process

Future decisions should document:
1. Problem
2. Context
3. Options considered
4. Decision
5. Consequences
6. Status

Statuses:
- Proposed
- Accepted
- Superseded
- Deprecated
