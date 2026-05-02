# Frontend Architecture - Multi-Layout System

## Overview

The PDF Editor frontend now uses Next.js 14 Route Groups to provide three completely separate layouts with independent sessions and navigation for different user types:

1. **Public Layout** - For unauthenticated users
2. **Customer Layout** - For regular users with PDF management
3. **Admin Layout** - For administrators with system management

## Directory Structure

```
frontend/app/
├── layout.js                          # Root layout (provides AuthProvider)
├── page.js                            # Root page (redirects based on auth)
├── unauthorized/
│   └── page.js                        # 403 Access Denied page
│
├── (public)/                          # PUBLIC ROUTE GROUP
│   ├── layout.js                      # Public layout with PublicNavbar
│   ├── page.js                        # Home page
│   ├── login/
│   │   └── page.js                    # Login page
│   └── register/
│       └── page.js                    # Registration page
│
├── (customer)/                        # CUSTOMER ROUTE GROUP
│   ├── layout.js                      # Customer layout with CustomerNavbar + auth protection
│   ├── dashboard/
│   │   ├── page.js                    # Dashboard (PDF management)
│   │   └── profile/
│   │       └── page.js                # User profile & password change
│
└── (admin)/                           # ADMIN ROUTE GROUP
    ├── layout.js                      # Admin layout with AdminNavbar + auth protection
    ├── page.js                        # Admin dashboard (stats)
    ├── users/
    │   └── page.js                    # User management
    ├── pdfs/
    │   └── page.js                    # PDF management
    └── settings/
        └── page.js                    # System settings
```

## How It Works

### Root Layout (`app/layout.js`)
- Provides global `AuthProvider` wrapper
- All child routes have access to authentication context
- No specific navigation or styling

### Public Layout (`app/(public)/layout.js`)
- **Navbar**: `PublicNavbar` - Shows Login/Register buttons
- **Protection**: None - Accessible to everyone
- **Redirect**: Logged-in users redirected to their dashboard
- **Pages**: Home, Login, Register
- **Session**: Public (no authentication required)

### Customer Layout (`app/(customer)/layout.js`)
- **Navbar**: `CustomerNavbar` - Shows user info and logout
- **Protection**: `CustomerProtectedRoute` - Only accessible to users with `role === 'user'`
- **Redirect**: Non-authenticated users redirected to `/login`
- **Redirect**: Admins redirected to `/unauthorized`
- **Pages**: Dashboard, Profile
- **Session**: Customer session (must be logged in as user)

### Admin Layout (`app/(admin)/layout.js`)
- **Navbar**: `AdminNavbar` - Shows admin-specific menu
- **Protection**: `AdminProtectedRoute` - Only accessible to users with `role === 'admin'`
- **Redirect**: Non-authenticated users redirected to `/login`
- **Redirect**: Regular users redirected to `/unauthorized`
- **Pages**: Dashboard, Users, PDFs, Settings
- **Session**: Admin session (must be logged in as admin)

## User Flow

### Anonymous User
```
/ (root) → Redirect to /
           → (public) layout → Home page
```

### Login Flow
```
/ → (public)/login
   → Enter credentials
   → Server validates & creates session
   → Redirect based on role:
     - If admin → /admin
     - If user → /dashboard
```

### Regular User Session
```
/dashboard/profile
  ↓
(customer) layout activated
  ↓
CustomerProtectedRoute checks:
  - Is user authenticated? ✓
  - Is user.role === 'user'? ✓
  ↓
Renders CustomerNavbar + Profile page
```

### Admin User Session
```
/admin/users
  ↓
(admin) layout activated
  ↓
AdminProtectedRoute checks:
  - Is user authenticated? ✓
  - Is user.role === 'admin'? ✓
  ↓
Renders AdminNavbar + Users page
```

### Role Mismatch
```
Regular user tries to access /admin/users
  ↓
AdminProtectedRoute checks:
  - Is user authenticated? ✓
  - Is user.role === 'admin'? ✗
  ↓
Redirects to /unauthorized (403)
```

## Component Hierarchy

### Navigation Components
- **PublicNavbar** - Login/Register buttons
- **CustomerNavbar** - User dashboard, profile, logout
- **AdminNavbar** - Users, PDFs, Settings, logout

### Route Protection
- **CustomerProtectedRoute** - Wraps customer layout pages
- **AdminProtectedRoute** - Wraps admin layout pages

### Context
- **AuthProvider** - Root level, provides user, token, login, register, logout
- **AuthContext** - Consumed by all components

## Session Management

### How Sessions Work

1. **Login** - User enters credentials
   ```javascript
   const { login } = useContext(AuthContext);
   const user = await login(email, password);
   ```

2. **Token Storage** - JWT stored in localStorage
   ```javascript
   localStorage.setItem('token', token);
   localStorage.setItem('user', JSON.stringify(user));
   ```

3. **Token Injection** - Automatically added to API requests
   ```javascript
   // In lib/api.js
   api.interceptors.request.use((config) => {
     const token = localStorage.getItem('token');
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });
   ```

4. **Token Expiration** - On 401 response, redirect to login
   ```javascript
   api.interceptors.response.use(
     (response) => response,
     (error) => {
       if (error.response?.status === 401) {
         localStorage.removeItem('token');
         window.location.href = '/login';
       }
     }
   );
   ```

5. **Logout** - Clear storage and redirect
   ```javascript
   const logout = () => {
     localStorage.removeItem('token');
     localStorage.removeItem('user');
     // User redirected by layout protection
   };
   ```

## Independent Sessions

### Key Feature: Different Layouts for Different Roles

Users never see both interfaces:
- **Customer dashboard** layout is completely separate from **admin** layout
- Different navbars, different routes, different permissions
- Clean separation of concerns

### Example Scenarios

**Scenario 1: User logs in**
```
1. User navigates to /login
2. Enters credentials (email: user@example.com, role: user)
3. Login succeeds
4. Token stored in localStorage
5. Redirected to /dashboard
6. (customer) layout activated
7. CustomerNavbar displayed
8. Customer-only pages accessible
9. Admin pages inaccessible (403 on attempt)
```

**Scenario 2: Admin logs in**
```
1. Admin navigates to /login
2. Enters credentials (email: admin@example.com, role: admin)
3. Login succeeds
4. Token stored in localStorage
5. Redirected to /admin
6. (admin) layout activated
7. AdminNavbar displayed
8. Admin-only pages accessible
9. Customer pages inaccessible (403 on attempt)
```

**Scenario 3: Session switching**
```
1. User logged in, viewing /dashboard
2. Clicks logout
3. Token cleared from localStorage
4. Component detects logout
5. Redirected to / (root)
6. AuthContext shows user = null
7. Root page redirects to / (public)
8. (public) layout activated
9. PublicNavbar displayed
10. Can now login as different user/role
```

## Styling & Design

### Navbar Styles
- **PublicNavbar**: Blue, minimal, login/register buttons
- **CustomerNavbar**: Light blue gradient, user info, dashboard link
- **AdminNavbar**: Purple gradient, multiple admin sections

### Page Layouts
- **Public pages**: Large hero sections, centered forms
- **Customer pages**: Dashboard with stats, file management
- **Admin pages**: Tables, statistics grids, management tools

## Testing the Multi-Layout System

### Test Case 1: Public Access
```bash
1. Navigate to http://localhost:3000
2. Should see home page
3. Should see PublicNavbar with Login/Register
```

### Test Case 2: User Login
```bash
1. Click Register
2. Create account (automatically becomes 'user' role)
3. Redirected to /dashboard
4. Should see CustomerNavbar
5. Should see PDF management interface
```

### Test Case 3: Admin Access
```bash
1. (Manually set user role to 'admin' in database)
2. Navigate to /admin
3. Should see AdminNavbar
4. Should see admin dashboard with stats
```

### Test Case 4: Role Protection
```bash
1. Login as regular user
2. Try to manually visit /admin
3. Should see 403 Unauthorized page
4. Should show current role: "user"
```

### Test Case 5: Session Persistence
```bash
1. Login as user
2. Refresh page (F5)
3. Token should still be in localStorage
4. Should remain on dashboard
5. User info should still be displayed
```

### Test Case 6: Logout
```bash
1. Click logout button
2. Token cleared from localStorage
3. Redirected to home
4. Should see PublicNavbar again
```

## API Integration

All API calls include JWT token from session:

```javascript
// Authentication endpoints
POST /api/auth/login - Returns token + user
POST /api/auth/register - Returns token + user
POST /api/auth/logout - Clears server session
POST /api/auth/refresh-token - Gets new token

// User endpoints (requires 'user' role)
GET /api/user/profile
PUT /api/user/profile
POST /api/user/change-password

// PDF endpoints (requires 'user' role)
POST /api/pdf/upload
GET /api/pdf/list
GET /api/pdf/:id
PUT /api/pdf/:id
DELETE /api/pdf/:id
POST /api/pdf/:id/download

// Admin endpoints (requires 'admin' role)
GET /api/admin/users
GET /api/admin/users/:id
PUT /api/admin/users/:id
DELETE /api/admin/users/:id
GET /api/admin/pdfs
DELETE /api/admin/pdfs/:id
GET /api/admin/stats
```

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Benefits of This Architecture

1. **Clean Separation**: Public, customer, and admin interfaces are completely separate
2. **Security**: Automatic route protection based on roles
3. **Maintainability**: Each layout and set of pages is isolated
4. **Scalability**: Easy to add new roles/layouts
5. **User Experience**: No confusion between interfaces
6. **Session Management**: Clear session handling for each role
7. **Independent Navigation**: Different navbars for different users
8. **Access Control**: Automatic 403 errors for unauthorized access

## Troubleshooting

### User can't login
- Check backend is running on port 5000
- Check JWT_SECRET is set in backend .env
- Check CORS_ORIGIN includes http://localhost:3000

### Token not persisting after refresh
- Check localStorage is enabled in browser
- Check API is returning token in response
- Check AuthContext is initializing correctly

### User stuck on loading page
- Check AuthProvider is at root layout
- Check loading state in AuthContext
- Check browser console for errors

### 403 Unauthorized on admin pages
- Verify user has 'admin' role in database
- Check role is being returned in login response
- Check AdminProtectedRoute is checking correct role

### Navigation not changing between layouts
- Check route group folders are correctly named (parentheses)
- Check layout files exist in each route group
- Check AuthContext is updating properly

## Future Enhancements

1. **Two-Factor Authentication**: Add 2FA for admin accounts
2. **Role-Based Features**: Add more granular role permissions
3. **Session Management**: Multiple active sessions, device management
4. **Activity Logging**: Track user actions per role
5. **Custom Dashboards**: Personalized layouts based on preferences
6. **Dark Mode**: Theme switching per layout

---

**Created**: May 2, 2026
**Version**: 1.0.0
**Status**: Production Ready
