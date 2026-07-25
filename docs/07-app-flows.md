# QueueLess — App Flows

**Version:** 1.0

## Purpose

This document describes the primary user journeys for the QueueLess MVP.

---

# 1. Business Owner Onboarding

## Goal
Get a new business operational in under 10 minutes.

Flow:
1. Launch app
2. Sign in / Create account
3. Verify identity
4. Create business
5. Create primary branch and configure hours
6. Define services
7. Set grace period
8. Add staff members and assign to services
9. Generate QR code (per branch/service)
10. Open queue sessions
11. Arrive at dashboard (showing active service queues)

Success:
Business is ready to accept customers.

Risks:
- Too many setup fields
- Staff setup abandoned

---

# 2. Customer Onboarding

Goal:
Join a queue with minimal friction.

Flow:
1. Open app
2. Scan QR or open business link
3. Find business or select branch
4. Select service
5. View wait estimate for service
6. Join queue as guest or sign in to save history
7. Receive confirmation

Success:
Customer has queue position.

Note:
- Authentication is optional for first-time queue join.
- The app should not require installation or account creation before a customer can enter a queue from a QR or share link.

---

# 3. Walk-in Customer Flow

Business:
1. Tap "Add Walk-in" for a specific service
2. Enter name/phone
3. Assign staff (optional)
4. Customer added to service queue session

---

# 4. Remote Join Flow

Customer:
1. Open business link or QR destination
2. Select branch
3. Select service
4. View service queue
5. Join
6. Receive ETA
7. Track live progress

System:
- Create QueueEntry
- Broadcast queue update
- Send confirmation notification

---

# 5. Live Queue Flow

Customer sees:
- Current position
- Estimated wait
- Status updates

Business sees:
- Ordered queue
- Queue actions

Realtime updates via WebSockets.

---

# 6. Call Customer

Business:
Call Next

System:
- Status = CALLED
- Notify customer
- Start grace timer

Customer:
Receives push notification.

---

# 7. Grace Period

If customer arrives:
- Check in
- Continue service

If timer expires:
- Mark skipped
- Allow recall

---

# 8. Complete Service

Business:
Tap Complete

System:
- Close QueueEntry
- Create ServiceSession
- Update analytics

---

# 9. Leave Queue

Customer:
Leave Queue

System:
- Status = LEFT
- Update positions
- Refresh queue

---

# 10. Analytics Flow

Owner opens dashboard.

Displays:
- Joined
- Served
- Left
- Avg wait
- Estimated lost revenue

Estimated lost revenue is derived from service price or average ticket value.

---

# 11. Notification Flow

Events:
- Queue joined
- Near turn
- Called
- Skipped

---

# 12. Settings Flow

Owner updates:
- Business profile
- Queue rules
- Grace period
- Notification preferences

---

# Empty States

- No businesses
- No staff
- Empty queue
- No analytics

Provide clear CTAs.

---

# Error States

- Network unavailable
- Authentication expired
- Queue full
- Duplicate join
- Notification failure

Show actionable recovery.

---

# Friction Risks

- Long onboarding
- Confusing queue status
- Inaccurate ETA
- Missed notifications
- Complex staff management

Mitigation:
- Progressive disclosure
- Simple language
- Realtime feedback
- Retry mechanisms

---

# Core Success Journey

Business signs up → Configures branches/services → Opens queue sessions → Customers join → Staff serve → Analytics reviewed → Repeat daily.
