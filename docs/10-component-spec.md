# QueueLess — Component Specification

**Version:** 1.0

## Purpose

This document defines the reusable UI component library for the QueueLess MVP.
Components should be composable, accessible, and consistent across the Business and Customer apps.

---

# Design Principles

- Reuse before creating new components
- One responsibility per component
- Mobile-first
- Accessible by default
- Configurable through props, not duplication

---

# Atoms

## Button

Variants:
- Primary
- Secondary
- Ghost
- Destructive

States:
- Default
- Pressed
- Disabled
- Loading

Props:
- label
- icon
- onPressed
- isLoading
- isDisabled

---

## Text Field

Supports:
- Text
- Email
- Phone
- Password
- Search

Features:
- Validation
- Error message
- Helper text
- Prefix/Suffix icon

---

## Avatar

Sizes:
- Small
- Medium
- Large

Supports:
- Image
- Initials
- Placeholder

---

## Badge

Types:
- Success
- Warning
- Error
- Neutral
- Info

---

## Chip

Uses:
- Queue status
- Staff status
- Filters

---

# Molecules

## Search Bar

Contains:
- Search input
- Clear action

---

## Queue Status Card

Displays:
- Position
- ETA
- Status
- Assigned staff

Actions:
- Leave Queue

---

## Staff Card

Displays:
- Avatar
- Name
- Availability
- Active queue count

Actions:
- Edit
- Archive

---

## Customer List Item

Displays:
- Name
- Position
- Wait time
- Status

Actions:
- Call
- Skip
- Complete

---

## Notification Tile

Displays:
- Icon
- Title
- Timestamp
- Read state

---

# Organisms

## Queue List

Purpose:
Display all active customers.

Supports:
- Pull to refresh
- Infinite updates
- Swipe actions

---

## Queue Controls

Actions:
- Call next
- Skip
- Recall
- Complete

---

## Analytics Summary

Cards:
- Joined
- Served
- Left
- Avg wait
- Lost revenue

---

## Staff Grid

Displays:
- Staff availability
- Current workload

---

## Business Header

Contains:
- Business name
- Queue status
- Settings shortcut

---

# Templates

## Dashboard

Sections:
- Header
- Queue summary
- Active queue
- Quick actions

---

## Queue Screen

- Filters
- Queue list
- FAB
- Bottom sheet actions

---

## Analytics Screen

- Date selector
- Metric cards
- Trend placeholders

---

## Settings Screen

Groups:
- Business
- Queue
- Notifications
- Account

---

# Component States

Every interactive component supports:
- Default
- Loading
- Empty
- Error
- Disabled

---

# Accessibility

- Minimum touch target 44x44
- Semantic labels
- Keyboard navigation where applicable
- WCAG AA contrast

---

# Naming Convention

Prefix reusable components:

QButton
QCard
QTextField
QBadge
QChip
QAvatar
QQueueCard
QAnalyticsCard

---

# Performance

- Prefer const constructors
- Avoid unnecessary rebuilds
- Lazy load long lists
- Memoize expensive components

---

# Design Tokens

Use design tokens only.

Never hardcode:
- Colors
- Typography
- Spacing
- Radius

---

# Future Components

- Appointment Card
- Loyalty Card
- Customer History Tile
- Forecast Component
- Multi-location Selector
