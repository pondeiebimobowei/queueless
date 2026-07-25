# QueueLess — API Specification

**Version:** 1.0
**Style:** REST + WebSockets
**Format:** JSON
**Authentication:** Firebase JWT Bearer Token

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
  "customerId":"uuid",
  "assignedStaffId":"uuid"
}

Response:
{
  "position":5,
  "estimatedWaitMinutes":20
}

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
