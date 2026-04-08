# UR-News Local Development Setup

This guide will help you set up the UR-News project to run locally on your machine.

## Prerequisites

- Node.js (v14 or higher) with yarn
- Docker & Docker Compose
- Git

## Project Structure

This is a monorepo using Lerna with 3 packages:
- **@ur-news/locations** - Shared locations library (TypeScript)
- **@ur-news/server** - Backend API (Node.js/Express)
- **@ur-news/web** - Frontend (React/TypeScript)

## Setup Instructions

### 1. Install Dependencies

```bash
cd ur-news
yarn install
```

This will automatically:
- Install all root and package dependencies
- Run the Lerna bootstrap process
- Compile TypeScript files

### 2. Start MongoDB with Docker

Start the MongoDB container (and Mongo Express for visual database management):

```bash
docker-compose up -d
```

This will:
- Start MongoDB on `127.0.0.1:27017`
- Start Mongo Express (MongoDB GUI) on `http://localhost:8081`
  - Username: `admin`
  - Password: `admin`

To verify MongoDB is running:
```bash
docker-compose ps
```

### 3. Configure Environment Variables

The `.env` files have been created in the `server` and `web` packages with default values.

**For the backend** - Edit `packages/server/.env`:
- `MONGO_URI`: Already configured for local MongoDB
- `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: Add your Cloudinary credentials
- `JWT_SECRET`: Change to a secure random string for production
- `BASE_URL`: Frontend URL (defaults to `http://localhost:3000`)

**For the frontend** - Edit `packages/web/.env`:
- `REACT_APP_API_URL`: Backend API URL (default: `http://localhost:4000/api/v1`)
- `REACT_APP_SOCKET_URL`: WebSocket URL (default: `http://localhost:4000`)

### 4. Get Cloudinary Credentials

1. Sign up for a free account at https://cloudinary.com
2. Go to your Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Update `packages/server/.env` with these values

### 5. Run the Project

#### Option A: Run All Services (Recommended for development)

```bash
yarn watch
```

This will start all packages in watch mode:
- Server with hot reload
- Web with React's dev server
- Locations library will be compiled

#### Option B: Run Services Individually

**Terminal 1 - Start the Backend:**
```bash
yarn start:server
```
Backend will be available at: `http://localhost:4000/api/v1/`

**Terminal 2 - Start the Frontend:**
```bash
yarn watch:web
```
Frontend will be available at: `http://localhost:3000`

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000/api/v1/
- **MongoDB GUI**: http://localhost:8081 (admin/admin)

## Available Scripts

### Root Level Commands

```bash
yarn install           # Install all dependencies
yarn start            # Start all packages
yarn watch            # Start all packages in watch mode
yarn build            # Build all packages
yarn test             # Run all tests

# Individual package commands
yarn start:server     # Start backend only
yarn watch:server     # Watch backend with hot reload
yarn build:web        # Build React frontend
yarn watch:web        # Start frontend dev server
yarn watch:locations  # Watch locations package
```

## Troubleshooting

### MongoDB Connection Error
- Ensure Docker is running: `docker-compose ps`
- Restart MongoDB: `docker-compose restart mongodb`
- Check connection string in `.env`: Should be `mongodb://root:password@localhost:27017/ur-news?authSource=admin`

### Port Already in Use
- Backend port (4000): `netstat -ano | findstr :4000` (Windows)
- Frontend port (3000): `netstat -ano | findstr :3000` (Windows)
- Change `PORT` in `packages/server/.env` if needed

### Dependencies Not Installing
```bash
yarn cache clean
rm -rf node_modules
yarn install
```

### Mongo Express Not Loading
- Wait a few seconds after starting containers
- Verify MongoDB is running first
- Check Docker logs: `docker-compose logs mongo-express`

## Stopping the Project

```bash
# Stop all running services
docker-compose down

# Stop and remove all data (fresh start next time)
docker-compose down -v
```

## Environment Variables Reference

### Server (.env)
| Variable | Purpose | Example |
|----------|---------|---------|
| `PORT` | Server port | `4000` |
| `NODE_ENV` | Environment mode | `development` |
| `JWT_SECRET` | JWT signing secret | Random string |
| `MONGO_URI` | MongoDB connection string | `mongodb://root:password@localhost:27017/ur-news?authSource=admin` |
| `CLOUDINARY_NAME` | Cloudinary cloud name | From Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | Cloudinary API key | From Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | From Cloudinary dashboard |
| `BASE_URL` | Frontend base URL | `http://localhost:3000` |
| `DROPBOX_TOKEN` | Dropbox API token | If using Dropbox features |

### Frontend (.env)
| Variable | Purpose | Example |
|----------|---------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:4000/api/v1` |
| `REACT_APP_SOCKET_URL` | WebSocket server URL | `http://localhost:4000` |

## Docker Commands

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f mongodb          # MongoDB logs
docker-compose logs -f mongo-express    # Mongo Express logs

# Stop containers
docker-compose stop

# Start containers
docker-compose start

# Remove containers and volumes
docker-compose down -v

# Restart MongoDB
docker-compose restart mongodb
```

## Next Steps

1. ✅ Install dependencies with `yarn install`
2. ✅ Start MongoDB with `docker-compose up -d`
3. ✅ Add Cloudinary credentials to `packages/server/.env`
4. ✅ Run the project with `yarn watch`
5. ✅ Open http://localhost:3000 in your browser

Happy coding! 🚀
