# Notifications Implementation Roadmap - Mobile App

**Date:** January 2025  
**Objective:** Implement local notifications system for account payable due dates using expo-notifications, following clean code architecture and existing project patterns

## Overview

This document outlines the complete roadmap for implementing notifications for account payable due dates in the mobile app. The implementation will be done in phases, with each phase documented separately.

## Architecture

### Folder Structure

```
mobile/src/
├── services/
│   └── notifications/
│       ├── notification.service.ts          # Core notification service
│       ├── notification-scheduler.service.ts # Scheduling logic
│       ├── notification-sync.service.ts     # Backend synchronization
│       └── types/
│           └── notification.types.ts        # Notification types
│
├── repositories/
│   └── notifications/
│       └── notification.repository.ts       # AsyncStorage operations
│
├── api/
│   └── app/
│       └── accounts-payable/
│           ├── list-by-date-range.ts        # Fetch accounts for sync
│           └── list-unpaid.ts                # Fetch unpaid accounts
│
├── hooks/
│   └── useAccountPayableNotifications.tsx    # React hook for notifications
│
├── dtos/
│   └── AccountPayableDTO.ts                 # Account payable DTOs
│
└── storage/
    └── storage-notifications.ts              # Notification storage helpers
```

## Implementation Phases

### Phase 1: Setup and Dependencies
- [x] Install expo-notifications
- [ ] Configure app.json for notifications
- [ ] Create folder structure

### Phase 2: Data Layer
- [ ] Create AccountPayableDTO
- [ ] Create API functions for fetching accounts
- [ ] Create notification storage utilities

### Phase 3: Core Services
- [ ] Create NotificationService (permissions, handlers)
- [ ] Create NotificationSchedulerService (schedule/cancel)
- [ ] Create NotificationRepository (AsyncStorage)
- [ ] Create NotificationSyncService (backend sync)

### Phase 4: React Integration
- [ ] Create useAccountPayableNotifications hook
- [ ] Integrate in App.tsx (listeners, initialization)
- [ ] Integrate in account creation flow
- [ ] Integrate in account update flow (mark as paid)

### Phase 5: Testing and Documentation
- [ ] Test all notification scenarios
- [ ] Create comprehensive documentation
- [ ] Update README.md

## Technical Decisions

### Library Choice
- **expo-notifications**: Chosen for Expo compatibility and local notification support
- **Why**: Native Expo module, works offline, no backend required for basic functionality

### Notification Strategy
- **Local Notifications**: Scheduled on device when account is created/updated
- **Synchronization**: Sync with backend when app opens or account is created
- **Cancellation**: Cancel notification when account is marked as paid

### Data Flow

```
1. User creates account → API call → AccountPayable returned
2. If isPaid === false → Schedule local notification
3. Save notification ID in AsyncStorage
4. When account marked as paid → Cancel notification
5. On app open → Sync with backend → Update notifications
```

## Features

### Core Features
- ✅ Schedule notification when account is created (if unpaid)
- ✅ Schedule notification for account due date
- ✅ Cancel notification when account is marked as paid
- ✅ Handle foreground notifications (show toast)
- ✅ Handle background notifications (system notification)
- ✅ Handle quit state notifications (system notification)
- ✅ Sync notifications on app open
- ✅ Request permissions on first use

### Future Enhancements
- [ ] Notification actions (mark as paid from notification)
- [ ] Multiple notification times (1 day before, on due date)
- [ ] Notification preferences (user settings)
- [ ] Push notifications (FCM/OneSignal integration)

## API Endpoints Required

### Existing (Already Available)
- `POST /accounts-payable` - Create account
- `PUT /accounts-payable/:id` - Update account (mark as paid)

### New (To Be Created)
- `GET /accounts-payable?startDate={date}&endDate={date}` - Fetch accounts by date range for sync

## Notification Content

### Default Notification
- **Title**: "Conta a vencer"
- **Body**: "{description} - R$ {amount} vence hoje"
- **Sound**: Default system sound
- **Badge**: Update app badge count

### Customization Options
- Configurable notification time (default: 8:00 AM)
- Configurable notification message format
- Support for multiple languages (future)

## Error Handling

### Permission Denied
- Show user-friendly message
- Provide instructions to enable in settings
- Gracefully degrade functionality

### Notification Scheduling Failures
- Log error for debugging
- Show toast notification to user
- Continue app functionality

### Sync Failures
- Retry mechanism
- Fallback to local data
- Show error toast

## Testing Scenarios

### Manual Testing
1. ✅ Request permissions on first use
2. ✅ Schedule notification for new account
3. ✅ Receive notification on due date (foreground)
4. ✅ Receive notification on due date (background)
5. ✅ Receive notification on due date (app closed)
6. ✅ Cancel notification when account marked as paid
7. ✅ Sync notifications on app open
8. ✅ Handle permission denied gracefully

### Edge Cases
- Account with past due date
- Account already paid when created
- Multiple accounts with same due date
- App reinstalled (notifications lost)
- Timezone changes

## Performance Considerations

### Optimization
- Batch notification operations
- Debounce sync operations
- Cache notification IDs in memory
- Minimize AsyncStorage operations

### Memory Management
- Clean up listeners on unmount
- Limit stored notification IDs
- Remove old notification references

## Security Considerations

### Data Privacy
- Notification data stored locally only
- No sensitive data in notification content
- Account IDs used for navigation only

### Permissions
- Request permissions explicitly
- Explain why permissions are needed
- Handle permission revocation gracefully

## Documentation Structure

Each phase will have its own documentation file:
- `NOTIFICATIONS_PHASE_1_SETUP.md` - Setup and dependencies
- `NOTIFICATIONS_PHASE_2_DATA_LAYER.md` - DTOs and API functions
- `NOTIFICATIONS_PHASE_3_SERVICES.md` - Core services implementation
- `NOTIFICATIONS_PHASE_4_INTEGRATION.md` - React integration
- `NOTIFICATIONS_PHASE_5_TESTING.md` - Testing and final documentation

## Timeline

- **Phase 1**: Setup (30 min)
- **Phase 2**: Data Layer (1 hour)
- **Phase 3**: Services (2 hours)
- **Phase 4**: Integration (1.5 hours)
- **Phase 5**: Testing & Docs (1 hour)

**Total Estimated Time**: ~6 hours

---

**Status**: In Progress  
**Last Updated**: January 2025
