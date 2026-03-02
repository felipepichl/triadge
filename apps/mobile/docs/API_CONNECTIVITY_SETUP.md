# API Connectivity Setup - Mobile App

**Date:** December 2025
**Objective:** Configure API connectivity for mobile app across different development and deployment scenarios

## Network Error Diagnosis

The "AxiosError: Network Error" typically occurs due to connectivity issues between the mobile app and backend API. This document covers all scenarios and solutions.

## API URL Configuration

### Automatic Configuration (`src/config/api.ts`)

The app automatically detects the environment and configures the API URL:

```typescript
export const getApiConfig = () => {
  if (__DEV__) {
    // Expo tunnel detection
    if (tunnel detected) {
      return { apiUrl: 'https://xxx.exp.direct', isTunnel: true }
    }
    // Physical device/emulator
    return { apiUrl: 'http://MACHINE_IP:3331', isTunnel: false }
  }
  // Production
  return { apiUrl: 'https://api.triadge.com', isTunnel: false }
}
```

## Development Scenarios

### 1. iOS Simulator / Android Emulator (Same Machine)

**Configuration:** Uses `http://localhost:3331`
**Requirements:** Backend server running on same machine
**Status:** ✅ Works out of the box

### 2. Physical Device (Same Network)

**Configuration:** Uses `http://YOUR_MACHINE_IP:3331`
**Requirements:**
- Backend server running
- Mobile device on same WiFi network
- Firewall allows port 3331

**Setup Steps:**
1. Find your machine's IP: `ifconfig` (macOS/Linux) or `ipconfig` (Windows)
2. Update `src/config/api.ts`:
   ```typescript
   const machineIP = '192.168.1.100' // Replace with your IP
   ```
3. Restart the app

### 3. Expo Tunnel (--tunnel flag)

**Configuration:** Automatic detection using `Constants.manifest.hostUri`
**Requirements:** `expo start --tunnel`
**Status:** ✅ Fully supported

**How it works:**
- Detects tunnel domain from Expo manifest
- Converts: `https://app-8081.exp.direct` → `https://app-3331.exp.direct`
- Works automatically without configuration

## Testing Connectivity

### 1. Health Check Endpoint

Test if the API is reachable:

```bash
# Replace YOUR_IP with your machine's IP
curl http://YOUR_IP:3331/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-12-26T12:50:56.836Z",
  "environment": "development"
}
```

### 2. CORS Test

Test CORS headers:

```bash
curl -X OPTIONS -H "Origin: exp://192.168.1.1:8081" \
     -H "Access-Control-Request-Method: POST" \
     -v http://YOUR_IP:3331/sessions
```

Expected: `Access-Control-Allow-Origin` header in response

### 3. Login Test

Test actual login endpoint:

```bash
curl -X POST -H "Content-Type: application/json" \
     -H "Origin: exp://192.168.1.1:8081" \
     -d '{"email":"test@example.com","password":"123"}' \
     http://YOUR_IP:3331/sessions
```

## Debug Logging

The app includes comprehensive logging in `src/lib/axios.ts`:

- **Request logs:** `📡 API Request: POST /sessions`
- **Success logs:** `✅ API Response: 200 /sessions`
- **Error logs:** `❌ API Error: { details }`
- **Network errors:** `🌐 Network Error - Check server connectivity and API URL`

Check device logs or terminal for these messages.

## Common Issues & Solutions

### Issue: "Network Error" on physical device

**Cause:** Using `localhost` which refers to the device itself
**Solution:** Use machine IP in `src/config/api.ts`

### Issue: "Network Error" on emulator

**Cause:** Emulator can't reach host machine
**Solution:**
- Android: Use `10.0.2.2` (special alias for host)
- iOS: Use machine IP

### Issue: Connection timeout

**Cause:** Firewall blocking port 3331
**Solution:** Configure firewall to allow incoming connections on port 3331

### Issue: HTTPS required for tunnel

**Cause:** Tunnel uses HTTPS but API URL constructed incorrectly
**Solution:** Automatic detection handles this - check logs for "Using Expo tunnel API URL"

### Issue: Wrong IP address

**Cause:** Machine IP changed or wrong IP configured
**Solution:**
```bash
# Find your IP
ifconfig | grep "inet " | grep -v 127.0.0.1
# or
ip addr show | grep "inet " | grep -v 127.0.0.1
```

## Environment Variables (Future)

For production deployments, consider using environment variables:

```typescript
// .env files
EXPO_PUBLIC_API_URL=https://api.triadge.com
EXPO_PUBLIC_API_TIMEOUT=10000
```

## Troubleshooting Checklist

1. ✅ Backend server is running (`curl http://localhost:3331/health`)
2. ✅ Correct IP configured in `src/config/api.ts`
3. ✅ Firewall allows port 3331
4. ✅ Mobile device on same network (for IP access)
5. ✅ Using tunnel mode for remote testing
6. ✅ Check device/emulator logs for detailed errors
7. ✅ Verify CORS headers if getting CORS errors

## Quick Setup for Testing

### For immediate testing on same machine:
```bash
# Terminal 1: Start backend
cd server/node-js && npm run dev:server

# Terminal 2: Start mobile (simulator)
cd mobile && npm start
```

### For testing on physical device:
```bash
# 1. Find your IP
ifconfig

# 2. Update mobile/src/config/api.ts with your IP
const machineIP = 'YOUR_IP_HERE'

# 3. Start backend
npm run dev:server

# 4. Start mobile with tunnel
expo start --tunnel
```

The app will automatically detect the tunnel and use the correct API URL!
