# PDF Editor Project - Development Guidelines

## Project Overview
Full-stack PDF editor web application (similar to Sejda.com) with:
- **Backend**: Node.js + Express + JWT Authentication on port 5000
- **Frontend**: Next.js + React + Tailwind CSS on port 3000
- **Database**: MySQL with Prisma ORM on port 3306
- **Features**: PDF upload, editing, admin panel, user management, role-based access

## Project Structure
```
pdfeditor/
├── backend/                    # Node.js/Express REST API
│   ├── src/
│   │   ├── server.js          # Main entry point
│   │   ├── routes/            # API routes (auth, pdf, admin, user)
│   │   ├── controllers/       # Request handlers
│   │   ├── middleware/        # Auth and error handling
│   │   ├── utils/             # Utility functions
│   │   └── config/            # Configuration files
│   ├── prisma/                # Prisma schema
│   ├── uploads/               # PDF file storage
│   ├── .env.example           # Environment variables template
│   ├── package.json           # Dependencies
│   └── Dockerfile             # Docker configuration
├── frontend/                   # Next.js web application
│   ├── app/                   # App router pages (home, login, register, dashboard, admin)
│   ├── components/            # React components (Navbar, ProtectedRoute)
│   ├── lib/                   # Utilities (api.js, AuthContext.js)
│   ├── styles/                # Global CSS and Tailwind
│   ├── public/                # Static assets
│   ├── .env.local             # Environment variables
│   ├── package.json           # Dependencies
│   ├── next.config.js         # Next.js configuration
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── postcss.config.js      # PostCSS configuration
│   └── Dockerfile             # Docker configuration
├── database/
│   └── schema.sql             # MySQL database schema
├── .github/
│   └── copilot-instructions.md # This file
├── .gitignore                 # Git ignore rules
├── docker-compose.yml         # Docker Compose configuration
├── package.json              # Root package.json for development
├── README.md                 # Project documentation
└── SETUP.md                  # Setup and installation guide

## Development Rules
- Backend runs on port 5000 (use `npm run dev`)
- Frontend runs on port 3000 (use `npm run dev`)
- MySQL runs on port 3306
- All API endpoints require JWT authentication (except /auth routes)
- Admin endpoints require 'admin' role
- User endpoints require 'user' role
- PDFs uploaded to /backend/uploads/
- Environment variables must be set before starting servers
- Use .env.example as template for .env files

## Key Technologies
- **Backend**: Express.js, JWT, Multer, PDFKit, pdf-lib
- **Frontend**: Next.js 14, React 18, Tailwind CSS, Axios
- **Database**: MySQL 8.0, Prisma ORM
- **DevOps**: Docker, Docker Compose
- **Authentication**: JSON Web Tokens (JWT)
- **File Upload**: Multer with PDF validation

## Quick Start Commands
```bash
# Install all dependencies
npm run install-all

# Start development servers (backend + frontend)
npm run dev

# Start with Docker
npm run docker-up

# For manual setup, see SETUP.md
```

## API Endpoints Reference

### Authentication (Public)
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/refresh-token

### PDF Management (User - Authenticated)
- POST /api/pdf/upload
- GET /api/pdf/list
- GET /api/pdf/:id
- PUT /api/pdf/:id
- DELETE /api/pdf/:id
- POST /api/pdf/:id/download

### User Profile (User - Authenticated)
- GET /api/user/profile
- PUT /api/user/profile
- POST /api/user/change-password

### Admin Routes (Admin Only - Authenticated)
- GET /api/admin/users
- GET /api/admin/users/:id
- PUT /api/admin/users/:id
- DELETE /api/admin/users/:id
- GET /api/admin/pdfs
- DELETE /api/admin/pdfs/:id
- GET /api/admin/stats

## Frontend Routes
- / - Home page
- /login - User login
- /register - User registration
- /dashboard - User dashboard (protected)
- /admin - Admin panel (protected, admin only)
- /unauthorized - Access denied page

## Important Notes
1. Update JWT_SECRET in production
2. Configure CORS_ORIGIN for production domains
3. Set proper database credentials
4. Use HTTPS in production
5. Implement rate limiting for production
6. Set up CI/CD pipeline for automated testing and deployment
