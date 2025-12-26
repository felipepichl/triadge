# CORS Configuration Update - Mobile Support

**Date:** December 2025
**Objective:** Update server CORS configuration to accept requests from mobile applications alongside web clients

## Problem Identified

The backend server was configured to only accept requests from the web application (`http://localhost:3577`), blocking all mobile app requests and causing authentication failures.

## Solution Implemented

### 1. Dynamic CORS Configuration

Updated `src/shared/infra/http/start/app.ts` with a flexible CORS configuration that supports multiple development environments:

```typescript
// Dynamic CORS configuration for development
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true)

    // Allow localhost origins for development
    if (origin.startsWith('http://localhost:') ||
        origin.startsWith('http://127.0.0.1:') ||
        origin.startsWith('exp://')) {
      return callback(null, true)
    }

    // Allow common development IPs and ports
    const allowedOrigins = [
      'http://localhost:3577', // Web app
      'http://localhost:8081', // Expo mobile (common port)
      'http://localhost:3000', // Alternative web port
      'http://192.168.1.1:8081', // Common local network IP + Expo port
      'http://10.0.2.2:8081', // Android emulator to host
      'exp://192.168.1.1:8081', // Expo development on local network
      'exp://10.0.2.2:8081', // Expo on Android emulator
    ]

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    // In production, you might want to restrict this
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
}

app.use(cors(corsOptions))
```

### 2. Supported Origins

The configuration now supports:

#### **Web Development:**
- `http://localhost:3577` - Main web application
- `http://localhost:3000` - Alternative web port

#### **Mobile Development:**
- `http://localhost:8081` - Expo development server
- `exp://*` - Expo development URLs
- `http://127.0.0.1:*` - Localhost variations

#### **Device Testing:**
- `http://192.168.1.1:*` - Local network IP
- `http://10.0.2.2:*` - Android emulator to host machine

#### **API Tools:**
- Requests without Origin header (Postman, mobile apps, etc.)

## Security Considerations

### Development Mode
- **Permissive**: Allows all localhost and exp:// origins in development
- **Credentials**: Supports cookies and authorization headers
- **Flexible**: Adapts to different development setups

### Production Mode
- **Restrictive**: Should be configured with specific allowed domains
- **Environment-aware**: Different rules for development vs production

## Testing Results

### ✅ CORS Preflight Test
```
OPTIONS /sessions HTTP/1.1
Origin: exp://192.168.1.1:8081
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type,Authorization

Response:
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: exp://192.168.1.1:8081
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
Access-Control-Allow-Headers: Content-Type,Authorization
```

### ✅ API Request Test
```
POST /sessions HTTP/1.1
Origin: exp://192.168.1.1:8081
Content-Type: application/json

Response: 400 Bad Request
{"message":"Incorrect email/password combination"}
```

## Mobile Development Setup

### For Physical Devices:
1. Find your computer's local IP address
2. Update mobile API configuration to use IP instead of localhost
3. Example: `http://192.168.1.100:3331`

### For Emulators:
- **Android Emulator**: Use `http://10.0.2.2:3331`
- **iOS Simulator**: Can use `http://localhost:3331`

### Environment Variables (Recommended):
```typescript
// In mobile app
const API_URL = __DEV__
  ? 'http://localhost:3331'      // Development on same machine
  : 'https://api.yourapp.com'    // Production
```

## Future Improvements

- Environment-based CORS configuration
- Rate limiting for API endpoints
- API versioning support
- Enhanced security headers (CSP, HSTS, etc.)
- Mobile-specific authentication flows
