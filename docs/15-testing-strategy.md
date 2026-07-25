# QueueLess — Testing Strategy

**Version:** 1.0
**Status:** Living Document

## Purpose

This document defines the testing strategy for QueueLess to ensure rapid delivery while maintaining product quality. The strategy is optimized for a solo founder or small team using AI-assisted development.

---

# Testing Principles

- Test business logic before UI details.
- Automate high-value, repeatable tests.
- Keep tests fast and deterministic.
- Prefer integration tests over excessive mocking.
- Every production bug should result in a regression test.

---

# Testing Pyramid

                    End-to-End
                 (Critical journeys)
                      ▲
              Integration Tests
        (API, database, service modules)
                      ▲
                 Unit Tests
        (Business logic, utilities, helpers)

Target distribution:
- Unit Tests: 70%
- Integration Tests: 25%
- End-to-End Tests: 5%

---

# Scope

## Backend

### Unit Tests

Test:
- Queue state transitions
- ETA calculations
- Grace period logic
- Validation helpers
- Analytics calculations
- Notification scheduling

Do not test:
- Prisma internals
- NestJS framework behavior

Coverage target:
>90% for business logic

---

### Integration Tests

Verify:
- REST endpoints
- Authentication
- Authorization
- Database persistence
- Queue lifecycle
- WebSocket events

Use:
- Test PostgreSQL database
- Supertest
- NestJS Testing Module

---

## Mobile Apps

### Component Tests

Test:
- Buttons
- Queue cards
- Staff cards
- Forms
- Navigation components
- Error states
- Loading states

---

### Integration Tests

Critical flows:
- Login
- Business onboarding
- Join queue
- Live queue updates
- Leave queue
- Complete service

---

### Golden Tests (Optional)

Use only for:
- Highly reusable UI components

Avoid excessive golden tests during MVP.

---

# End-to-End Testing

Critical user journeys:

Business:
1. Register
2. Create business
3. Add staff
4. Open queue
5. Call customer
6. Complete service

Customer:
1. Login
2. Join queue
3. Receive notification
4. Check in
5. Leave queue

These should pass before every production release.

---

# Manual QA Checklist

Before each release verify:

Authentication
- Register
- Login
- Logout
- Password reset

Business
- Create business
- Edit profile
- Add staff

Queue
- Join
- Leave
- Call
- Skip
- Recall
- Complete

Notifications
- Joined
- Near turn
- Called

Analytics
- Metrics accurate
- Dashboard loads

Settings
- Save successfully
- Validation works

Offline
- Graceful error messages
- Retry after reconnect

---

# Test Data

Maintain reusable seed data for:
- Single business
- Multiple staff
- Active queue
- Historical sessions

Never depend on production data.

---

# Performance Testing

Backend targets:
- p95 API latency <500ms
- Queue updates <250ms
- WebSocket broadcasts <200ms

Mobile targets:
- Cold start <2 seconds
- 60 FPS interactions

---

# Security Testing

Verify:
- JWT validation
- Authorization rules
- Input validation
- SQL injection protection
- Rate limiting
- Sensitive data not exposed

---

# Accessibility Testing

Ensure:
- Screen reader labels
- Minimum touch targets
- Color contrast (WCAG AA)
- Dynamic text scaling

---

# CI/CD Gates

Every pull request must pass:
1. Lint
2. Static analysis
3. Unit tests
4. Integration tests
5. Build

Deployment blocked if any gate fails.

---

# Regression Strategy

Whenever a production bug is fixed:
1. Reproduce with a test.
2. Fix the issue.
3. Ensure the regression test passes.

---

# AI-Assisted Testing

Use AI to:
- Generate unit test skeletons
- Suggest edge cases
- Expand coverage

Always review generated tests for correctness.

---

# Definition of Done

A feature is complete when:
- Acceptance criteria met
- Unit tests added
- Integration tests updated
- Manual QA passed
- Documentation updated
- No critical regressions

---

# Future Enhancements

- Automated E2E in CI
- Load testing
- Chaos testing
- Contract testing
- Synthetic monitoring
