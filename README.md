# Clothing Store - Full Stack Application

A clean, minimal full-stack clothing store built with React, TypeScript, Node.js, Express, and MongoDB.

## Tech Stack

### Frontend
- React 18 + TypeScript
- TailwindCSS for styling
- Vite for build tooling
- React Router for navigation
- Axios for API calls

### Backend
- Node.js + Express + TypeScript
- MongoDB with Mongoose
- JWT authentication
- Multer for image uploads
- bcrypt for password hashing

## Project Structure

```
.
├── client/          # React frontend application
│   ├── src/
│   │   ├── api/     # API client functions
│   │   ├── components/  # React components
│   │   ├── pages/   # Page components
│   │   └── ...
│   └── ...
├── server/          # Express backend application
│   ├── src/
│   │   ├── models/  # Mongoose models
│   │   ├── routes/  # API routes
│   │   ├── middleware/  # Auth middleware
│   │   └── scripts/  # Seed scripts
│   └── ...
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

### 1. Clone and Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Setup Backend

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Create a `.env` file (copy from `env.example`):
   ```bash
   cp env.example .env
   ```

3. Edit `.env` with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/clothing-store
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ADMIN_EMAIL=admin@store.com
   ADMIN_PASSWORD=admin123
   CLIENT_URL=http://localhost:3000
   ```

4. Create the uploads directory:
   ```bash
   mkdir uploads
   ```

5. Seed the admin user:
   ```bash
   npm run seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### 3. Setup Frontend

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```

2. (Optional) Create a `.env` file if you need to customize the API URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

## How Frontend and Backend Connect

### API Communication

1. **Base URL**: The frontend is configured to proxy API requests through Vite's dev server. All requests to `/api/*` are automatically forwarded to `http://localhost:5000/api`.

2. **Authentication**: 
   - JWT tokens are stored in http-only cookies for security
   - The frontend sends requests with `withCredentials: true` to include cookies
   - The backend validates tokens on protected routes using middleware

3. **CORS**: The backend is configured to accept requests from `http://localhost:3000` with credentials enabled.

### API Endpoints

#### Public Routes
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

#### Admin Routes (Protected)
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `POST /api/products` - Create product (requires auth)
- `PUT /api/products/:id` - Update product (requires auth)
- `DELETE /api/products/:id` - Delete product (requires auth)

## Features

### Public Website
- **Home Page**: Browse all products in a grid layout
- **Product Details**: View individual product information
- No customer authentication required

### Admin Dashboard
- **Login**: Secure admin authentication
- **Product Management**: 
  - Create new products
  - Edit existing products
  - Delete products
  - Upload product images
- Protected routes requiring authentication

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens stored in http-only cookies
- Admin routes protected with authentication middleware
- No direct database access from frontend
- Input validation on both frontend and backend

## Development Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run seed` - Create admin user

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Production Deployment

### Backend
1. Build the TypeScript code:
   ```bash
   npm run build
   ```

2. Set production environment variables in `.env`

3. Start the server:
   ```bash
   npm start
   ```

### Frontend
1. Build the React app:
   ```bash
   npm run build
   ```

2. Serve the `dist` folder using a static file server (nginx, Apache, etc.)

3. Update the API URL in production environment variables

## Default Admin Credentials

After running the seed script:
- **Email**: `admin@store.com`
- **Password**: `admin123`

⚠️ **Important**: Change the default password after first login in production!

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or update `MONGODB_URI` in `.env`
- Check MongoDB connection string format

### Image Upload Issues
- Ensure the `uploads` directory exists in the server folder
- Check file size limits (currently 5MB)
- Verify file types (only images allowed)

### CORS Issues
- Ensure `CLIENT_URL` in backend `.env` matches your frontend URL
- Check that `withCredentials: true` is set in API client

## License

ISC

