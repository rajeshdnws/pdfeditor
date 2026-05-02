# Multi-Layout System - Quick Start Guide

## What's New?

Your PDF Editor now has **three completely separate layouts** with independent sessions:

### 1. 🌐 Public Layout
- Home page, Login, Registration
- No authentication required
- For new and returning visitors

### 2. 👤 Customer Layout
- User dashboard, PDF management, profile
- Requires login as regular user
- Separate from admin interface

### 3. 👑 Admin Layout  
- Admin dashboard, user management, PDF management, settings
- Requires login as admin
- Completely separate from customer interface

## Quick Test

### Running the Application

```bash
# From root directory
npm run dev

# Or separately:
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

### Access Points

- **Public**: http://localhost:3000 → Home page
- **Customer**: http://localhost:3000/dashboard → User dashboard
- **Admin**: http://localhost:3000/admin → Admin panel

### Test Login Credentials

**Regular User**
- Email: `user@example.com`
- Role: `user` (customer)
- Access: Dashboard, Profile, PDF management

**Admin User**
- Email: `admin@example.com`
- Role: `admin` (administrator)
- Access: Admin panel, Users, PDFs, Settings

## User Flows

### New User
```
1. Visit http://localhost:3000
2. See home page with "Get Started"
3. Click "Get Started" → /register
4. Create account (becomes 'user')
5. Redirected to /dashboard
6. See Customer Dashboard (PDF upload/management)
```

### Admin Login
```
1. Visit http://localhost:3000/login
2. Enter admin credentials
3. Redirected to /admin
4. See Admin Dashboard (statistics & user management)
5. Access users, PDFs, settings
```

### Session Switching
```
1. User logged in, viewing dashboard
2. Click "Logout"
3. Redirected to home page
4. See PublicNavbar with Login/Register
5. Can now login as different user/role
```

## File Structure Overview

```
app/
├── (public)/        ← Public pages (no auth)
│   ├── page.js      ← Home
│   ├── login/
│   └── register/
│
├── (customer)/      ← Customer pages (user role only)
│   ├── dashboard/   ← PDF management
│   └── dashboard/profile/
│
└── (admin)/         ← Admin pages (admin role only)
    ├── page.js      ← Admin dashboard
    ├── users/       ← User management
    ├── pdfs/        ← PDF management
    └── settings/    ← System settings
```

## Key Features

✅ **Separate Sessions** - Admin and customer have different login sessions
✅ **Independent Layouts** - Three completely different interfaces
✅ **Automatic Routing** - Users redirected based on role
✅ **Role Protection** - Automatic 403 for unauthorized access
✅ **Responsive Design** - Works on all devices
✅ **Clean Navigation** - Different navbars for each layout

## Common Tasks

### Create a Test Account
```
1. Click "Get Started" on home page
2. Fill in name, email, password
3. Account created as 'user' role automatically
4. Redirected to customer dashboard
```

### Upload a PDF (Customer)
```
1. On dashboard, select PDF file
2. Click "Upload PDF"
3. File appears in your files list
4. Can download or delete
```

### Manage Users (Admin)
```
1. Login as admin
2. Go to "Users" section
3. View all users
4. Change roles or delete users
```

### View System Stats (Admin)
```
1. Login as admin
2. Dashboard shows:
   - Total users
   - Total PDFs
   - Number of admins
   - File statistics
```

## Troubleshooting

### Can't see admin panel
- Make sure you're logged in as admin
- Check user role in database
- If regular user tries /admin → see 403 page

### Lost login session after refresh
- Browser should remember token
- Check localStorage is enabled
- Try logging in again if issue persists

### Wrong navigation bar showing
- Refresh the page (F5)
- Check you're logged in with correct role
- Try logout and login again

### API errors
- Check backend is running on port 5000
- Check .env files have correct values
- Check CORS_ORIGIN includes localhost:3000

## Navigation Bars

### Public Navbar
```
PDF Editor    [Login] [Get Started]
```

### Customer Navbar
```
PDF Editor - Dashboard    [Profile] [Dashboard] [Logout]
```

### Admin Navbar
```
⚙️ Admin Panel    [Dashboard] [Users] [PDFs] [Settings] [Logout]
```

## API Endpoints

### Public (No Auth Required)
- `POST /api/auth/login`
- `POST /api/auth/register`

### Customer (User Role Required)
- `POST /api/pdf/upload`
- `GET /api/pdf/list`
- `DELETE /api/pdf/:id`
- `GET /api/user/profile`
- `PUT /api/user/profile`

### Admin (Admin Role Required)
- `GET /api/admin/users`
- `DELETE /api/admin/users/:id`
- `GET /api/admin/pdfs`
- `DELETE /api/admin/pdfs/:id`
- `GET /api/admin/stats`

## Next Steps

1. **Review Architecture** - See `frontend/ARCHITECTURE.md` for detailed structure
2. **Test All Flows** - Try logging in as different roles
3. **Add Mock Data** - Create test users and PDFs
4. **Customize Styling** - Modify Tailwind classes as needed
5. **Implement Real PDFs** - Add PDF editing features

## Important Notes

⚠️ **Mock Data**: Currently using in-memory arrays. Switch to real database for production.

⚠️ **JWT Secret**: Change `JWT_SECRET` in backend .env for production.

⚠️ **Email Verification**: Not implemented. Add for production.

⚠️ **Password Hashing**: Using bcryptjs. Ensure properly configured.

## Support

- Check `frontend/ARCHITECTURE.md` for detailed documentation
- Check `README.md` in root for setup instructions
- Check `SETUP.md` for troubleshooting

---

**Happy testing! 🚀**

For detailed technical documentation, see `frontend/ARCHITECTURE.md`
