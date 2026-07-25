# QueueLess — API Specification

**Version:** 1.0
**Style:** REST + WebSockets
**Format:** JSON
**Authentication:** Firebase JWT Bearer Token for staff/owner actions; guest queue actions use a per-entry access token.

# API Principles

- REST for CRUD operations
- WebSockets for realtime queue updates
- Versioned endpoints (`/v1`)
- Consistent error responses
- Resource-oriented URLs

Base URL:
`/api/v1# QueueLess — API Specification

**Version:** 1.0
**Style:** REST + WebSockets
**Format:** JSON
**Authentication:** Firebase JWT Bearer Token for staff/owner actions; guest queue actions use a per-entry access token.

# API Principles

- REST for CRUD operations
- WebSockets for realtime queue updates
- Versioned endpoints (`/v1`)
- Consistent error responses
- Resource-oriented URLs

Base URL:
`/api/v1`

---

# Authentication

## POST /auth/register

Registers a new user.

Request:
{
  "idToken": "<firebase_id_token>"
}

Response:
{
  "accessToken": "...",
  "user": {}
}

---

## POST /auth/login

Validates Firebase token and returns application session.

---

# Guest Queue Access

## POST /queue-sessions/{id}/entries

Join queue as a guest or signed-in customer.

Request:
{
  "assignedStaffId": "uuid",
  "customerId": "uuid",
  "phone": "+234...",
  "firstName": "Ada",
  "lastName": "Okafor"
}

Response:
{
  "id": "uuid",
  "position": 5,
  "estimatedWaitMinutes": 20,
  "accessToken": "guest_entry_secret"
}

## GET /queue-entries/{id}

Get queue entry details.

Auth:
- Firebase JWT for authenticated users
- `accessToken` for guest self-service access

## DELETE /queue-entries/{id}

Leave queue.

Auth:
- Firebase JWT for authenticated users
- `accessToken` for guest self-service access

## PATCH /queue-entries/{id}/check-in

Customer checked in.

Auth:
- Firebase JWT for authenticated users
- `accessToken` for guest self-service access

Note:
- Guest queue entries must receive a random opaque access token at join time.
- The token should be required for any self-service action and stored locally by the customer app.
- Queue entry UUIDs alone must not be sufficient to read or modify guest state.
- The request body represents two mutually exclusive paths:
  - Signed-in customer: send `customerId` and omit guest profile fields.
  - Guest customer: send `phone`, `firstName`, and `lastName`; the backend creates the business-scoped customer record.
- `assignedStaffId` is optional in either path.

Guest Flow:
1. Customer submits guest details.
2. Backend creates or reuses the business-scoped customer record for `businessId + phone`.
3. Backend creates the queue entry.
4. Backend returns `accessToken` for self-service access.

---

# Businesses

## GET /businesses

Returns businesses for authenticated owner.

## POST /businesses

Create a business.

Request:
{
  "name": "Fade Masters",
  "phone": "+234..."
}

Response:
{
  "id": "uuid"
}

## GET /businesses/{id}

Get business details.

## PATCH /businesses/{id}

Update business.

# Branches

## GET /branches

List branches for authenticated owner.

## POST /branches

Create a branch.

Request:
{
  "businessId": "uuid",
  "name": "Lekki Branch"
}

## GET /branches/{id}

Get branch details.

## PATCH /branches/{id}

Update branch.

---

# Services

## GET /branches/{id}/services

List services for a branch.

## POST /branches/{id}/services

Create a service.

Request:
{
  "name": "Hair",
  "estimatedDurationMinutes": 30
}

## PATCH /services/{id}

Update service.

---

# Staff

## GET /branches/{id}/staff

List staff for a branch.

## POST /branches/{id}/staff

Create staff member.

Request:
{
  "displayName": "John",
  "serviceIds": ["uuid1", "uuid2"]
}

## PATCH /staff/{id}

Update staff (including service assignments).

## DELETE /staff/{id}

Archive staff.

---

# Customers

## GET /customers

List customers.

## GET /customers/{id}

Customer details.

# Queue Sessions

## GET /services/{serviceId}/queue-sessions

Get queue sessions for a service (e.g. today's active session).

## POST /queue-sessions/{id}/entries

Join queue.

Request:
{
  "assignedStaffId":"uuid",
  "customerId":"uuid",
  "phone":"+234...",
  "firstName":"Ada",
  "lastName":"Okafor"
}

Response:
{
  "id":"uuid",
  "position": 5,
  "estimatedWaitMinutes": 20,
  "accessToken": "guest_entry_secret"
}

Request semantics:
- Authenticated customer flow: `customerId` only.
- Guest flow: `phone`, `firstName`, `lastName`.
- `assignedStaffId` is optional.

Response semantics:
- `accessToken` is returned for every queue entry so the customer app can support self-service actions even when the customer is not authenticated.

## PATCH /queue-entries/{id}/call

Call customer.

## PATCH /queue-entries/{id}/skip

Skip customer.

## PATCH /queue-entries/{id}/recall

Recall customer.

## PATCH /queue-entries/{id}/check-in

Customer checked in.

## PATCH /queue-entries/{id}/complete

Complete service.

## DELETE /queue-entries/{id}

Leave queue.

Auth:
- Firebase JWT for authenticated users
- `accessToken` for guest self-service access

---

# Analytics

## GET /analytics/today

Returns:
- joined
- served
- left
- average wait
- estimated lost revenue

---

# Notifications

## GET /notifications

Notification history.

---

# Settings

## GET /settings

Business settings.

## PATCH /settings

Update queue rules.

---

# Error Format

{
  "statusCode":400,
  "message":"Validation failed",
  "errors":[]
}

---

# Pagination

{
  "data":[],
  "page":1,
  "limit":20,
  "total":100
}

---

# WebSocket Events

Client Subscribe

queue:{queueSessionId}

Server Events

queue.joined

queue.updated

queue.called

queue.completed

queue.skipped

notification.sent

---

# Status Enums

QueueStatus

WAITING

CALLED

CHECKED_IN

SKIPPED

COMPLETED

LEFT

StaffStatus

AVAILABLE

BUSY

OFFLINE

---

# Authentication Flow

Firebase Login

↓

ID Token

↓

NestJS Verification

Guest Join Flow

Guest details or signed-in customer

↓

Queue entry creation

↓

Random access token returned

↓

Customer app stores token locally for self-service actions

↓

Application JWT

↓

Authorized Requests

---

# Rate Limits

Authenticated:
120 req/min

Anonymous:
30 req/min

---

# API Versioning

Current:
v1

Future:
v2 introduces appointments without breaking queue endpoints.
`

---

# Authentication

## POST /auth/register

Registers a new user.

Request:
{
  "idToken": "<firebase_id_token>"
}

Response:
{
  "accessToken": "...",
  "user": {}
}

---

## POST /auth/login

Validates Firebase token and returns application session.

---

# Guest Queue Access

## POST /queue-sessions/{id}/entries

Join queue as a guest or signed-in customer.

Request:
{
  "assignedStaffId": "uuid",
  "customerId": "uuid",
  "phone": "+234...",
  "firstName": "Ada",
  "lastName": "Okafor"
}

Response:
{
  "id": "uuid",
  "position": 5,
  "estimatedWaitMinutes": 20,
  "accessToken": "guest_entry_secret"
}

## GET /queue-entries/{id}

Get queue entry details.

Auth:
- Firebase JWT for authenticated users
- `accessToken` for guest self-service access

## DELETE /queue-entries/{id}

Leave queue.

Auth:
- Firebase JWT for authenticated users
- `accessToken` for guest self-service access

## PATCH /queue-entries/{id}/check-in

Customer checked in.

Auth:
- Firebase JWT for authenticated users
- `accessToken` for guest self-service access

Note:
- Guest queue entries must receive a random opaque access token at join time.
- The token should be required for any self-service action and stored locally by the customer app.
- Queue entry UUIDs alone must not be sufficient to read or modify guest state.
- The request body represents two mutually exclusive paths:
  - Signed-in customer: send `customerId` and omit guest profile fields.
  - Guest customer: send `phone`, `firstName`, and `lastName`; the backend creates the business-scoped customer record.
- `assignedStaffId` is optional in either path.

Guest Flow:
1. Customer submits guest details.
2. Backend creates or reuses the business-scoped customer record for `businessId + phone`.
3. Backend creates the queue entry.
4. Backend returns `accessToken` for self-service access.

---

# Businesses

## GET /businesses

Returns businesses for authenticated owner.

## POST /businesses

Create a business.

Request:
{
  "name": "Fade Masters",
  "phone": "+234..."
}

Response:
{
  "id": "uuid"
}

## GET /businesses/{id}

Get business details.

## PATCH /businesses/{id}

Update business.

# Branches

## GET /branches

List branches for authenticated owner.

## POST /branches

Create a branch.

Request:
{
  "businessId": "uuid",
  "name": "Lekki Branch"
}

## GET /branches/{id}

Get branch details.

## PATCH /branches/{id}

Update branch.

---

# Services

## GET /branches/{id}/services

List services for a branch.

## POST /branches/{id}/services

Create a service.

Request:
{
  "name": "Hair",
  "estimatedDurationMinutes": 30
}

## PATCH /services/{id}

Update service.

---

# Staff

## GET /branches/{id}/staff

List staff for a branch.

## POST /branches/{id}/staff

Create staff member.

Request:
{
  "displayName": "John",
  "serviceIds": ["uuid1", "uuid2"]
}

## PATCH /staff/{id}

Update staff (including service assignments).

## DELETE /staff/{id}

Archive staff.

---

# Customers

## GET /customers

List customers.

## GET /customers/{id}

Customer details.

# Queue Sessions

## GET /services/{serviceId}/queue-sessions

Get queue sessions for a service (e.g. today's active session).

## POST /queue-sessions/{id}/entries

Join queue.

Request:
{
  "assignedStaffId":"uuid",
  "customerId":"uuid",
  "phone":"+234...",
  "firstName":"Ada",
  "lastName":"Okafor"
}

Response:
{
  "id":"uuid",
  "position": 5,
  "estimatedWaitMinutes": 20,
  "accessToken": "guest_entry_secret"
}

Request semantics:
- Authenticated customer flow: `customerId` only.
- Guest flow: `phone`, `firstName`, `lastName`.
- `assignedStaffId` is optional.

Response semantics:
- `accessToken` is returned for every queue entry so the customer app can support self-service actions even when the customer is not authenticated.

## PATCH /queue-entries/{id}/call

Call customer.

## PATCH /queue-entries/{id}/skip

Skip customer.

## PATCH /queue-entries/{id}/recall

Recall customer.

## PATCH /queue-entries/{id}/check-in

Customer checked in.

## PATCH /queue-entries/{id}/complete

Complete service.

## DELETE /queue-entries/{id}

Leave queue.

Auth:
- Firebase JWT for authenticated users
- `accessToken` for guest self-service access

---

# Analytics

## GET /analytics/today

Returns:
- joined
- served
- left
- average wait
- estimated lost revenue

---

# Notifications

## GET /notifications

Notification history.

---

# Settings

## GET /settings

Business settings.

## PATCH /settings

Update queue rules.

---

# Error Format

{
  "statusCode":400,
  "message":"Validation failed",
  "errors":[]
}

---

# Pagination

{
  "data":[],
  "page":1,
  "limit":20,
  "total":100
}

---

# WebSocket Events

Client Subscribe

queue:{queueSessionId}

Server Events

queue.joined

queue.updated

queue.called

queue.completed

queue.skipped

notification.sent

---

# Status Enums

QueueStatus

WAITING

CALLED

CHECKED_IN

SKIPPED

COMPLETED

LEFT

StaffStatus

AVAILABLE

BUSY

OFFLINE

---

# Authentication Flow

Firebase Login

↓

ID Token

↓

NestJS Verification

Guest Join Flow

Guest details or signed-in customer

↓

Queue entry creation

↓

Random access token returned

↓

Customer app stores token locally for self-service actions

↓

Application JWT

↓

Authorized Requests

---

# Rate Limits

Authenticated:
120 req/min

Anonymous:
30 req/min

---

# API Versioning

Current:
v1

Future:
v2 introduces appointments without breaking queue endpoints.
