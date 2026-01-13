# Notifications States Coverage - Mobile App

**Date:** January 2025  
**Objective:** Document how the implementation handles Foreground, Background, and Quit states

## ✅ Coverage Summary

| State | Status | Implementation |
|-------|--------|----------------|
| **Foreground** | ✅ Covered | Handler + Listener + Toast |
| **Background** | ✅ Covered | System notification + Response listener |
| **Quit** | ✅ Covered | System notification + Response listener |

## Detailed Implementation

### 1. Foreground State (App Open) ✅

**When:** App is open and active on screen

**Implementation:**

```typescript
// 1. Handler configured in NotificationService
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,  // Shows system alert
    shouldPlaySound: true,  // Plays sound
    shouldSetBadge: true,   // Updates badge
  }),
})

// 2. Listener in App.tsx
notificationListener.current = setupForegroundListener((notification) => {
  // Show toast when notification is received in foreground
  toast.info(notification.request.content.body || 'Nova notificação')
})
```

**What Happens:**
1. Notification is scheduled and triggers
2. `setNotificationHandler` intercepts it
3. System shows alert (based on handler config)
4. `addNotificationReceivedListener` fires
5. Toast is displayed to user
6. User can interact with notification

**Files:**
- `src/services/notifications/notification.service.ts` - Handler configuration
- `App.tsx` - Foreground listener setup

### 2. Background State (App Minimized) ✅

**When:** App is running but minimized/not visible

**Implementation:**

```typescript
// Notifications are scheduled locally
await Notifications.scheduleNotificationAsync({
  content: { ... },
  trigger: { date: dueDate },
})

// Response listener handles tap
Notifications.addNotificationResponseReceivedListener((response) => {
  // Navigate when user taps notification
  navigation.dispatch(...)
})
```

**What Happens:**
1. Notification is scheduled
2. When trigger time arrives, app is in background
3. **System automatically displays notification** (no code needed)
4. User sees notification in notification center
5. User taps notification
6. App comes to foreground
7. `addNotificationResponseReceivedListener` fires
8. Navigation handler executes

**Files:**
- `src/services/notifications/notification-scheduler.service.ts` - Scheduling
- `src/components/NotificationNavigationHandler.tsx` - Response handling

**Key Point:** Background notifications work **automatically** - the OS handles display. We just need to schedule them and handle the response.

### 3. Quit State (App Closed) ✅

**When:** App is completely closed/not running

**Implementation:**

```typescript
// Same scheduling as background
await Notifications.scheduleNotificationAsync({
  content: { ... },
  trigger: { date: dueDate },
})

// Response listener is registered when app starts
// It will catch notifications tapped even if app was closed
Notifications.addNotificationResponseReceivedListener((response) => {
  // This fires when app opens from quit state
  navigation.dispatch(...)
})
```

**What Happens:**
1. Notification is scheduled before app closes
2. App closes completely
3. When trigger time arrives, **system displays notification** (OS handles)
4. User sees notification in notification center
5. User taps notification
6. **App launches from quit state**
7. App initializes (App.tsx runs)
8. `NotificationNavigationHandler` component mounts
9. `addNotificationResponseReceivedListener` is registered
10. **Listener fires with the notification that was tapped**
11. Navigation handler executes

**Files:**
- `src/services/notifications/notification-scheduler.service.ts` - Scheduling
- `src/components/NotificationNavigationHandler.tsx` - Response handling
- `App.tsx` - App initialization

**Key Point:** Quit state works because:
- Notifications are stored by the OS (not by the app)
- OS displays them even when app is closed
- When user taps, OS launches app
- App initializes and listener catches the tap

## Code Flow by State

### Foreground Flow

```
Notification Triggered
    ↓
setNotificationHandler() intercepts
    ↓
Returns: shouldShowAlert: true
    ↓
System shows alert
    ↓
addNotificationReceivedListener() fires
    ↓
Toast displayed
    ↓
User can interact
```

### Background Flow

```
Notification Triggered
    ↓
App in background
    ↓
OS displays notification automatically
    ↓
User taps notification
    ↓
App comes to foreground
    ↓
addNotificationResponseReceivedListener() fires
    ↓
Navigation handler executes
```

### Quit Flow

```
Notification Triggered
    ↓
App is closed
    ↓
OS displays notification automatically
    ↓
User taps notification
    ↓
OS launches app
    ↓
App.tsx initializes
    ↓
NotificationNavigationHandler mounts
    ↓
addNotificationResponseReceivedListener() registered
    ↓
Listener fires with tapped notification
    ↓
Navigation handler executes
```

## Verification Checklist

### ✅ Foreground State
- [x] Handler configured (`setNotificationHandler`)
- [x] Listener registered (`addNotificationReceivedListener`)
- [x] Toast displayed when notification received
- [x] User can see and interact with notification

### ✅ Background State
- [x] Notifications scheduled locally
- [x] OS displays notification when app minimized
- [x] Response listener registered (`addNotificationResponseReceivedListener`)
- [x] Navigation works when user taps notification

### ✅ Quit State
- [x] Notifications scheduled before app closes
- [x] OS stores and displays notifications
- [x] App launches when notification tapped
- [x] Response listener catches tap after app launches
- [x] Navigation works correctly

## Testing Each State

### Test Foreground
1. Open app
2. Schedule test notification for 10 seconds
3. Keep app open
4. Wait for notification
5. ✅ Should see toast + system alert

### Test Background
1. Open app
2. Schedule test notification for 10 seconds
3. **Minimize app** (home button)
4. Wait for notification
5. ✅ Should see system notification
6. Tap notification
7. ✅ App should open and navigate

### Test Quit
1. Open app
2. Schedule test notification for 10 seconds
3. **Close app completely** (swipe away from recent apps)
4. Wait for notification
5. ✅ Should see system notification
6. Tap notification
7. ✅ App should launch and navigate

## Important Notes

### 1. Local Notifications vs Push Notifications

**Current Implementation:** Local notifications (scheduled on device)

- ✅ Work in all states (foreground, background, quit)
- ✅ Don't require internet
- ✅ Don't require backend
- ✅ Stored by OS, displayed by OS

**Push Notifications (Future):**
- Would require FCM/APNs
- Would require backend
- Would work the same way in all states

### 2. Response Listener Timing

**Critical:** The `addNotificationResponseReceivedListener` must be registered **before** the user taps the notification, OR it will catch the tap when the app initializes.

**Current Implementation:**
- ✅ Registered in `NotificationNavigationHandler` component
- ✅ Component is always mounted (inside Routes)
- ✅ Listener is registered on app start
- ✅ Works for all states

### 3. Navigation from Quit State

**How it works:**
1. User taps notification while app is closed
2. OS launches app
3. App.tsx runs → Routes mount
4. NotificationNavigationHandler mounts
5. Listener registers
6. **Listener immediately fires with the notification that was tapped**
7. Navigation executes

This is why the listener works even from quit state - the OS "queues" the tap and delivers it when the app initializes.

## Potential Issues and Solutions

### Issue: Navigation doesn't work from quit state

**Cause:** Listener not registered before tap, or navigation context not ready

**Solution:** Current implementation handles this correctly:
- Listener is in a component that mounts early
- Navigation context is available when component mounts
- Listener catches queued taps from OS

### Issue: Notification doesn't show in background/quit

**Cause:** Permissions not granted, or notification not properly scheduled

**Solution:**
- Check permissions are granted
- Verify notification was scheduled successfully
- Check OS notification settings for the app

### Issue: Toast doesn't show in foreground

**Cause:** Handler not configured, or listener not registered

**Solution:**
- Verify `setNotificationHandler` is called
- Verify `addNotificationReceivedListener` is registered
- Check toast component is in App.tsx

## Summary

✅ **Foreground:** Fully covered with handler + listener + toast  
✅ **Background:** Fully covered with system notifications + response listener  
✅ **Quit:** Fully covered with system notifications + response listener  

**All three states are properly implemented and tested!**

---

**Status:** ✅ Complete Coverage of All States  
**Last Updated:** January 2025
