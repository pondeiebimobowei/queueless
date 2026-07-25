# QueueLess Mobile

This app follows a feature-first layout with clean layers:

```text
src/
  app/
  core/
  shared/
  features/
```

## What belongs where

### `app`
- Navigation
- Providers
- Global hooks
- App config

### `core`
- API client
- Auth token handling
- Storage
- Notifications
- WebSocket client
- Permissions

### `shared`
- Reusable UI
- Utilities
- Constants
- Theme
- Shared types

### `features`
- Auth
- Queues
- Businesses
- Profile
- Notifications
- Settings

## Current scaffold

The app shell currently renders an architecture preview so the structure is visible while product features are being added.

## Running the app

From `apps/mobile`:

```sh
npm start
npm run android
npm run ios
```
