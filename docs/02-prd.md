# QueueLess — Product Requirements Document (PRD)

**Version:** 1.0  
**Status:** Draft  
**Owner:** Founder

## 1. Purpose

This PRD defines the MVP for QueueLess, a mobile-first SaaS platform that helps walk-in businesses manage customer flow and reduce operational friction.

## 2. Product Goals

### Business Goals
- Validate daily usage by walk-in businesses.
- Achieve first 20 active businesses.
- Convert first paying customers.

### User Goals
- Replace manual queue management.
- Reduce customer uncertainty.
- Provide operational visibility.

## 3. Personas

### Business Owner
- Owns a 5–20 station business.
- Manages daily operations.
- Wants fewer walkaways and less chaos.

### Customer
- Visits walk-in businesses.
- Wants predictable wait times.

## 4. MVP Scope

### Business App
- Authentication
- Business onboarding (Branch & Service setup)
- Staff & Assignment management
- Queue Session management (per Service)
- Walk-in registration
- QR code generation
- Queue actions (Call, Skip, Recall, Complete)
- Queue settings
- Basic analytics

### Customer App
- Search Business & Select Branch
- Select Service
- Join queue
- View live position
- Push notifications
- Check in
- Leave queue

## 5. Out of Scope

- Appointments
- CRM
- Loyalty
- Inventory
- Payments
- Marketplace
- AI
- Forecasting
- APIs

## 6. Functional Requirements

### Authentication
**Priority:** Must Have

Acceptance Criteria:
- Users can register.
- Users can sign in.
- Password reset supported.

Note:
- Customer queue joining must support a low-friction guest path from QR or business link.
- Authentication is required for saved history, notifications, and repeat visits, but not as a hard gate before first queue join.

### Business Onboarding
**Priority:** Must Have

Acceptance Criteria:
- Create business.
- Add primary branch and configure hours.
- Define services (e.g., Hair, Nails).
- Add initial staff and assign to services.

### Staff Management
**Priority:** Must Have

Acceptance Criteria:
- Create, edit, archive staff.
- Assign staff to one or more services.
- Mark available/busy.

### Queue Management
**Priority:** Must Have

Acceptance Criteria:
- Queues are scoped by Queue Sessions (daily per service).
- Add walk-ins to specific service.
- Accept remote joins for a service.
- Unified queue ordering per session.
- Call next.
- Skip.
- Recall.
- Complete service.
- Grace period handling.

Edge Cases:
- Customer leaves.
- Customer never arrives.
- Duplicate customer.

### QR Join
**Priority:** Must Have

Acceptance Criteria:
- Unique QR per business.
- Customer joins correct queue.

### Customer Queue
**Priority:** Must Have

Acceptance Criteria:
- Live position.
- Estimated wait.
- Leave queue.

### Notifications
**Priority:** Must Have

Acceptance Criteria:
- Queue joined.
- Near turn.
- Called.

### Analytics
**Priority:** Must Have

Metrics:
- Joined
- Served
- Left
- Average wait
- Estimated lost revenue

Data source:
- Services should capture a price or average ticket value so estimated lost revenue can be computed.

## 7. User Stories

- As an owner, I can define services for my branch.
- As an owner, I can add staff and assign them to services.
- As an owner, I can manage today's queue sessions for each service.
- As an owner, I can see how many customers left per service.
- As a customer, I can select a branch and a service.
- As a customer, I can join remotely.
- As a customer, I know my place in line.
- As a customer, I receive notifications.

## 8. Non-functional Requirements

- Mobile-first
- Offline-friendly where practical
- Average API response <500ms
- Real-time updates
- Secure authentication
- Audit logging
- Daily backups

## 9. Success Metrics

- Daily Active Businesses
- Weekly retention
- Time to first queue
- Queue completion rate
- Paid conversion
- Customer abandonment

## 10. Risks

- Businesses continue using notebooks.
- Customers resist installing app.
- Notification failures.
- Poor onboarding.

## 11. Assumptions

- Queue pain is recurring.
- Businesses will pay after seeing value.
- Queue management becomes a daily habit.

## 12. Future Roadmap

Phase 2:
- Queue history
- Better analytics

Phase 3:
- Appointments
- Loyalty

Phase 4:
- Staff scheduling

Phase 5:
- Demand forecasting
- Operational intelligence

## 13. Definition of Done

A feature is complete when:
- Acceptance criteria pass.
- Unit tests added.
- Manual QA completed.
- Documentation updated.
- Product owner approves.
