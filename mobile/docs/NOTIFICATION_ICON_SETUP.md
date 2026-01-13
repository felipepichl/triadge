# Notification Icon Setup - Mobile App

**Date:** January 2025  
**Objective:** Configure custom notification icon for the mobile app

## Important Note: Expo Go Limitation

⚠️ **When using Expo Go, notifications will always show the Expo Go icon, not your app's icon.**

This is because Expo Go is a container app that runs your code, but it's not a standalone build of your app.

## Solution: Development Build or Production Build

To use your custom app icon in notifications, you need to create a **standalone build**:

### Option 1: Development Build (Recommended for Testing)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS
eas build:configure

# Create development build for Android
eas build --profile development --platform android

# Or for iOS
eas build --profile development --platform ios
```

### Option 2: Production Build

```bash
# Create production build
eas build --platform android
# or
eas build --platform ios
```

## Current Configuration

The `app.json` is already configured with:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/icon.png",
          "color": "#ffffff",
          "sounds": [],
          "mode": "production"
        }
      ]
    ]
  }
}
```

### Icon Requirements

**For Android:**
- **File:** `./assets/icon.png`
- **Size:** 96x96 pixels (recommended)
- **Format:** PNG with transparency
- **Color:** Should work on both light and dark backgrounds
- The icon will be automatically converted to the required format by Expo

**For iOS:**
- Uses the app icon automatically
- No separate notification icon needed
- Configured via `"icon": "./assets/icon.png"` in app.json

## Testing Custom Icon

1. **Create a development build:**
   ```bash
   eas build --profile development --platform android
   ```

2. **Install the build on your device:**
   - Download the APK/IPA from EAS
   - Install on your device
   - Open the app (not Expo Go)

3. **Test notifications:**
   - Use the test buttons in AccountPayable screen
   - The notification should show your custom icon

## Icon File Location

The icon file should be at:
```
mobile/assets/icon.png
```

Make sure this file exists and is a valid PNG image.

## Troubleshooting

### Icon not showing in Expo Go
- **Expected behavior** - Expo Go always shows Expo Go icon
- **Solution:** Create a development build

### Icon not showing in development build
- Check if `icon.png` exists in `assets/` folder
- Verify the file is a valid PNG
- Rebuild the app after changing the icon
- Clear app cache and reinstall

### Icon appears blurry
- Use a higher resolution icon (96x96 or 192x192)
- Ensure the icon is properly formatted
- Check if the icon has transparency issues

## Next Steps

1. ✅ Configuration is already set in `app.json`
2. ⏳ Create development build when ready to test custom icon
3. ⏳ Test notifications with custom icon
4. ⏳ Create production build for release

---

**Status:** Configuration Complete - Ready for Build  
**Last Updated:** January 2025
