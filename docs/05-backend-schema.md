# QueueLess — Backend Schema Design

**Version:** 1.0
**Database:** PostgreSQL
**ORM:** Prisma

# Overview

QueueLess uses a relational PostgreSQL database designed around a modular, multi-tenant architecture. Every business owns its own operational data while sharing the same application infrastructure.

## Core Design Principles

- Multi-tenant by Business
- UUID primary keys
- Soft deletes where appropriate
- Audit timestamps on every table
- Referential integrity
- Optimized for queue operations

# Entity Relationship Overview

Business
├── Branches
│   ├── Services
│   │   ├── QueueSessions
│   │   │   └── QueueEntries
│   │   └── StaffServices (Mapping)
│   └── Staff
├── Customers
└── Notifications

Customer
└── QueueEntries

Staff
├── StaffServices (Mapping)
└── ServiceSessions

QueueEntry
└── ServiceSession

# Tables

## businesses

Purpose:
Stores business information.

Fields:
- id (UUID, PK)
- name
- slug
- phone
- email
- logoUrl
- isActive
- createdAt
- updatedAt

Indexes:
- slug (unique)
- isActive

---

## branches

Purpose:
Physical locations or subdivisions of a business.

Fields:
- id (UUID, PK)
- businessId (FK)
- name
- address
- timezone
- gracePeriodMinutes
- isActive
- createdAt
- updatedAt

Indexes:
- businessId
- isActive

---

## services

Purpose:
Specific offerings at a branch.

Fields:
- id (UUID, PK)
- branchId (FK)
- businessId (FK)
- name
- estimatedDurationMinutes
- isVisible
- isActive
- createdAt
- updatedAt

Indexes:
- branchId
- businessId

---

## queue_sessions

Purpose:
The daily queue instance for a specific service.

Fields:
- id (UUID, PK)
- serviceId (FK)
- businessId (FK)
- date (Date)
- status (OPEN | CLOSED)
- createdAt
- updatedAt

Indexes:
- serviceId
- businessId
- date

---

## staff

Purpose:
Business staff members.

Fields:
- id
- branchId (FK)
- businessId (FK)
- firstName
- lastName
- displayName
- phone
- avatarUrl
- status (AVAILABLE | BUSY | OFFLINE)
- isActive
- createdAt
- updatedAt

Indexes:
- branchId
- businessId
- status

---

## staff_services

Purpose:
Maps staff to the services they can perform.

Fields:
- staffId (FK)
- serviceId (FK)
- businessId (FK)

Indexes:
- staffId
- serviceId
- businessId

---

## customers

Purpose:
Stores customer records.

Fields:
- id
- phone
- firstName
- lastName
- createdAt
- updatedAt

Indexes:
- phone

---

## queue_entries

Purpose:
Current and historical queue records.

Fields:
- id
- queueSessionId (FK)
- businessId
- customerId
- assignedStaffId (nullable)
- position
- status
- joinedAt
- calledAt
- checkedInAt
- completedAt
- skippedAt
- estimatedWaitMinutes
- notes

Status Enum:
- WAITING
- CALLED
- CHECKED_IN
- SKIPPED
- COMPLETED
- LEFT

Indexes:
- queueSessionId
- businessId
- status
- joinedAt
- assignedStaffId

---

## service_sessions

Purpose:
Completed service records.

Fields:
- id
- queueEntryId
- staffId
- businessId
- startedAt
- completedAt
- durationMinutes

Indexes:
- staffId
- businessId

---

## notifications

Purpose:
Notification history.

Fields:
- id
- businessId
- customerId
- type
- title
- body
- sentAt
- delivered
- opened

Indexes:
- customerId
- sentAt

# Relationships

Business
1:N Branches

Branch
1:N Services

Branch
1:N Staff

Service
1:N QueueSessions

QueueSession
1:N QueueEntries

Staff
M:N Services (via staff_services)

Business
1:N Customers

Business
1:N Notifications

Customer
1:N QueueEntries

QueueEntry
1:1 ServiceSession

Staff
1:N ServiceSessions

# Multi-Tenant Strategy

Every operational table contains:
- businessId

All queries must be scoped by businessId.

Never expose cross-business data.

# Roles

Owner
- Full access

Staff
- Queue management
- Customer handling

Customer
- Queue participation only

# Events

QueueJoined
QueueCalled
QueueSkipped
QueueCompleted
CustomerCheckedIn
NotificationSent

# Background Jobs

- Push notifications
- Daily analytics aggregation
- Cleanup expired sessions

# Example API Resources

/businesses
/branches
/services
/staff
/customers
/queue-sessions
/notifications
/analytics

# Example Payload

POST /queue-sessions/{id}/entries

{
  "customerId": "uuid",
  "assignedStaffId": "uuid"
}

Response

{
  "id": "uuid",
  "position": 7,
  "status": "WAITING",
  "estimatedWaitMinutes": 35
}

# Prisma Modeling Notes

- UUID IDs
- Enums for statuses
- Cascade deletes avoided
- Soft deletes preferred
- createdAt / updatedAt on all entities

# Future Tables

appointments
loyalty_accounts
customer_visits
staff_schedule
inventory
payments
business_settings
