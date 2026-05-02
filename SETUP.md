# PDF Editor - Setup Guide

## Quick Start (Recommended)

### Option 1: Using Docker (Easiest)

```bash
# Start all services
docker-compose up

# The application will be available at:
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MySQL: localhost:3306
```

### Option 2: Manual Setup

#### Step 1: Install Dependencies

```bash
# From root directory
npm run install-all

# Or manually:
cd backend && npm install
cd ../frontend && npm install
```

#### Step 2: Setup Database

**Windows:**
```bash
# Start MySQL
# Make sure MySQL server is running

# Create database and tables
mysql -u root -p < database\schema.sql
```

**Mac/Linux:**
```bash
mysql -u root -p < database/schema.sql
```

#### Step 3: Configure Environment Variables

**Backend (.env)**
```bash
cd backend
cp .env.example .env

# Edit .env and update:
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pdf_editor_db
JWT_SECRET=your-super-secret-jwt-key-change-in-production
CORS_ORIGIN=http://localhost:3000
```

**Frontend (.env.local)**
```bash
cd ../frontend

# Create .env.local
echo NEXT_PUBLIC_API_URL=http://localhost:5000/api > .env.local
```

#### Step 4: Start Development Servers

**In separate terminals:**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Or run together:**
```bash
# From root directory
npm run dev
```

## Verification

After setup, verify everything works:

1. **Backend Health Check**
   ```bash
   curl http://localhost:5000/health
   # Should return: {"status":"Backend is running"}
   ```

2. **Frontend**
   - Visit http://localhost:3000
   - You should see the PDF Editor home page

3. **Test Registration**
   - Go to http://localhost:3000/register
   - Create a test account
   - You should be redirected to the dashboard

## Database Setup (If Using Prisma)

```bash
cd backend

# Setup Prisma
npm install @prisma/client prisma

# Generate Prisma Client
npx prisma generate

# Run migrations (if using migrations)
npm run migrate

# Seed database (optional)
npm run seed
```

## Troubleshooting

### Port Already in Use

**Windows:**
```bash
# Find process on port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID> /F

# Or change port in backend/.env to 5001
PORT=5001
```

**Mac/Linux:**
```bash
# Find process
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### MySQL Connection Error

```bash
# Check MySQL is running
mysql -u root -p

# If not running, start MySQL
# Windows: Services > MySQL80 > Start
# Mac: brew services start mysql
# Linux: sudo service mysql start
```

### npm Dependencies Issues

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Environment Variables Not Loading

```bash
# Make sure files are in correct location:
# backend/.env
# frontend/.env.local

# Restart development server after creating .env files
```

## Default Admin Account

To create an admin account, modify the auth controller or use the database directly:

```sql
-- Add admin user directly to database
INSERT INTO users (id, email, name, password, role, createdAt, updatedAt)
VALUES ('admin1', 'admin@example.com', 'Admin User', 'hashed_password_here', 'admin', NOW(), NOW());
```

## Next Steps

1. **Configure Authentication**
   - Change JWT_SECRET in production
   - Implement password encryption
   - Set up email verification

2. **Add PDF Features**
   - PDF splitting/merging
   - Text extraction
   - Page rotation
   - Compression

3. **Deployment**
   - Deploy backend to Heroku/AWS
   - Deploy frontend to Vercel/Netlify
   - Set up CI/CD pipeline

4. **Security**
   - Enable HTTPS
   - Add rate limiting
   - Implement CSRF protection
   - Set up WAF

## Commands Reference

```bash
# From root directory
npm run install-all          # Install all dependencies
npm run dev                  # Run both servers in development
npm run build                # Build both projects
npm run start                # Start production servers
npm run docker-up            # Start with Docker
npm run docker-down          # Stop Docker containers

# Backend commands
cd backend
npm run dev                  # Development with nodemon
npm start                    # Production mode
npm test                     # Run tests
npm run migrate              # Database migrations

# Frontend commands
cd frontend
npm run dev                  # Development server
npm run build                # Build for production
npm start                    # Start production server
npm test                     # Run tests
npm run lint                 # Check code quality
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Support

If you encounter issues:
1. Check this guide's troubleshooting section
2. Review the README.md
3. Check backend/frontend console logs
4. Verify database connection
5. Check environment variables

---

**Happy coding! 🚀**
