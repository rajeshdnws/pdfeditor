# PDF Editor - Full Stack Application

A complete web-based PDF editor application similar to Sejda.com with admin panel and user management.

## Architecture

```
pdf-editor/
├── backend/          # Node.js + Express REST API
├── frontend/         # Next.js + React web application
├── database/         # MySQL schemas and migrations
└── README.md
```

## Features

- **User Authentication**: Registration and login with JWT tokens
- **PDF Management**: Upload, download, and delete PDFs
- **User Dashboard**: Personal PDF file management
- **Admin Panel**: User management, statistics, and system administration
- **Role-based Access**: User and admin roles with different permissions
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **PDF Processing**: PDFKit, pdf-lib

### Frontend
- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: Built-in Context API

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MySQL (v5.7 or higher)
- Git

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pdfeditor
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your database credentials
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=pdf_editor_db

# Run database migrations
npm run migrate

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### 4. Database Setup

```bash
# Log into MySQL
mysql -u root -p

# Create database
source database/schema.sql
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh-token` - Refresh JWT token

### PDF Management
- `POST /api/pdf/upload` - Upload a PDF (authenticated)
- `GET /api/pdf/list` - List user's PDFs (authenticated)
- `GET /api/pdf/:id` - Get PDF details (authenticated)
- `PUT /api/pdf/:id` - Update PDF (authenticated)
- `DELETE /api/pdf/:id` - Delete PDF (authenticated)
- `POST /api/pdf/:id/download` - Download PDF (authenticated)

### User Management
- `GET /api/user/profile` - Get user profile (authenticated)
- `PUT /api/user/profile` - Update user profile (authenticated)
- `POST /api/user/change-password` - Change password (authenticated)

### Admin Routes
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/users/:id` - Get user details (admin only)
- `PUT /api/admin/users/:id` - Update user (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)
- `GET /api/admin/pdfs` - Get all PDFs (admin only)
- `DELETE /api/admin/pdfs/:id` - Delete PDF (admin only)
- `GET /api/admin/stats` - Get system statistics (admin only)

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pdf_editor_db
JWT_SECRET=your-super-secret-jwt-key-change-in-production
CORS_ORIGIN=http://localhost:3000
MAX_FILE_SIZE=50000000
UPLOAD_DIR=./uploads
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Development Guide

### Project Structure

**Backend:**
- `src/server.js` - Main server file
- `src/routes/` - API route definitions
- `src/controllers/` - Request handlers
- `src/middleware/` - Custom middleware (auth, error handling)
- `src/config/` - Configuration files
- `src/utils/` - Utility functions

**Frontend:**
- `app/` - Next.js app router (pages)
- `components/` - Reusable React components
- `lib/` - Utility functions and API setup
- `styles/` - Global CSS and Tailwind

## Running in Production

### Backend
```bash
cd backend
npm install
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run build
npm start
```

## Database Migrations

```bash
# Create a new migration
npm run migrate -- --name migration_name

# Run pending migrations
npm run migrate

# Push to production
npm run migrate:prod

# Generate Prisma client
npx prisma generate
```

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Security Considerations

- Change `JWT_SECRET` in production
- Use HTTPS in production
- Implement rate limiting
- Validate all file uploads
- Use environment variables for sensitive data
- Implement CSRF protection
- Set proper CORS headers

## Troubleshooting

### Database Connection Error
- Check MySQL is running
- Verify database credentials in .env
- Ensure database is created

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Token Expiration Issues
- Implement refresh token mechanism
- Increase JWT_SECRET strength
- Clear browser localStorage and try again

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License

## Support

For issues and questions, please create an issue in the repository.
