# QueueLess — API Specification

**Version:** 1.0
**Style:** REST + WebSockets
**Format:** JSON
**Authentication:** QueueLess JWT Bearer Token for authenticated users; guest queue actions use a per-entry access token.

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

Create a platform user account.

Request:
{
  "email": "owner@queueless.com",
  "password": "strong-password"
}

Response:
{
  "accessToken": "...",
  "refreshToken": "...",
  "user": {}
}

Notes:
- Registration creates a plain user account.
- Roles are assigned server-side, not supplied by the client.
- Becoming an owner happens when the user creates a business.

---

## POST /auth/login

Validate credentials and return a new session.

Request:
{
  "email": "owner@queueless.com",
  "password": "strong-password"
}

Response:
{
  "accessToken": "...",
  "refreshToken": "...",
  "user": {}
}

---

## POST /auth/refresh

Rotate the refresh token and issue a new access token.

Request:
{
  "refreshToken": "..."
}

Response:
{
  "accessToken": "...",
  "refreshToken": "..."
}

---

## POST /auth/logout

Revoke the current refresh token.

---

## POST /auth/forgot-password

Send a password reset email.

Request:
{
  "email": "owner@queueless.com"
}

---

## POST /auth/reset-password

Reset a password with a valid token.

Request:
{
  "token": "...",
  "newPassword": "strong-password"
}

---

## POST /auth/verify-email

Verify an email address with a one-time token.

Request:
{
  "token": "..."
}

---

## POST /auth/send-phone-otp

Send a one-time code to a customer phone number for account linking or sign-in.

Request:
{
  "phone": "+234..."
}

---

## POST /auth/verify-phone-otp

Verify a phone OTP and issue a QueueLess session.

Request:
{
  "phone": "+234...",
  "code": "123456"
}

Response:
{
  "accessToken": "...",
  "refreshToken": "...",
  "user": {}
}

Notes:
- Phone OTP is the bridge between guest customer records and authenticated customer accounts.
- Use this for saving history, repeat visits, and verified notification preferences.

---

# Guest Queue Access

## POST /queue-sessions/{id}/entries

Join a queue as a guest or signed-in customer.

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

Notes:
- Signed-in customer flow: send `customerId` only.
- Guest flow: send `phone`, `firstName`, and `lastName`; the backend creates or reuses the business-scoped customer record.
- `assignedStaffId` is optional in either path.
- Every queue entry returns an `accessToken` so guest self-service actions remain private.

## GET /queue-entries/{id}

Get queue entry details.

Auth:
- QueueLess JWT for authenticated users
- `accessToken` for guest self-service access

## DELETE /queue-entries/{id}

Leave queue.

Auth:
- QueueLess JWT for authenticated users
- `accessToken` for guest self-service access

## PATCH /queue-entries/{id}/check-in

Customer checked in.

Auth:
- QueueLess JWT for authenticated users
- `accessToken` for guest self-service access

## PATCH /queue-entries/{id}/call

Call customer.

Auth:
- QueueLess JWT for authenticated business users

## PATCH /queue-entries/{id}/skip

Skip customer.

Auth:
- QueueLess JWT for authenticated business users

## PATCH /queue-entries/{id}/recall

Recall customer.

Auth:
- QueueLess JWT for authenticated business users

## PATCH /queue-entries/{id}/complete

Complete service.

Auth:
- QueueLess JWT for authenticated business users

Notes:
- Guest token access is only for self-service actions on the guest's own queue entry.
- Staff actions always require authenticated business access.

---

# Businesses

## GET /businesses

Returns businesses for the authenticated user.

## POST /businesses

Create a business.

Request:
{
  "name": "Glow Beauty",
  "phone": "+234..."
}

Response:
{
  "id": "uuid"
}

Notes:
- The authenticated creator becomes the OWNER of the business.

## GET /businesses/{id}

Get business details.

## PATCH /businesses/{id}

Update business.

---

# Branches

## GET /branches

List branches for the authenticated business user.

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
  "estimatedDurationMinutes": 30,
  "priceAmount": 5000,
  "priceCurrency": "NGN"
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

Update staff, including service assignments.

## DELETE /staff/{id}

Archive staff.

---

# Customers

## GET /customers

List customers.

## GET /customers/{id}

Customer details.

## POST /customers

Create or link a customer record.

Request:
{
  "phone": "+234...",
  "firstName": "Ada",
  "lastName": "Okafor"
}

---

# Queue Sessions

## GET /services/{serviceId}/queue-sessions

Get queue sessions for a service, usually today's active session.

## POST /queue-sessions/{id}/entries

Join queue.

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

Request semantics:
- Authenticated customer flow: `customerId` only.
- Guest flow: `phone`, `firstName`, `lastName`.
- `assignedStaffId` is optional.

Response semantics:
- `accessToken` is returned for every queue entry so the customer app can support self-service actions even when the customer is not authenticated.

---

# Analytics

## GET /analytics/today

Returns:
- joined
- served
- left
- average wait
- estimated lost revenue
- active staff
- current queue

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
  "statusCode": 400,
  "message": "Validation failed",
  "errors": []
}

---

# Pagination

{
  "data": [],
  "page": 1,
  "limit": 20,
  "total": 100
}

---

# WebSocket Events

Client Subscribe:

queue:{queueSessionId}

Server Events:

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

Email/password or phone OTP

↓

QueueLess login endpoint

↓

NestJS session issuance

↓

QueueLess access token and refresh token

---

# Rate Limits

Authenticated:
120 req/min

Guest:
30 req/min
