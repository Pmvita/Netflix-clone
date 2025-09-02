# 🚀 Netflix Clone - Deployment Guide

## Current Environment Setup

### Service Architecture
The Netflix clone is running in a containerized environment with:
- **Frontend**: React app on port 3000
- **Backend**: FastAPI server on port 8001  
- **Database**: MongoDB (configured via environment variables)
- **Process Manager**: Supervisor for service management

### Environment Variables
```bash
# Frontend (.env)
REACT_APP_BACKEND_URL=<configured_external_url>

# Backend (.env)
MONGO_URL=<configured_mongodb_url>
DB_NAME=<database_name>
```

## 🏃‍♂️ Quick Deployment Commands

### Service Management
```bash
# Check service status
sudo supervisorctl status

# Restart all services
sudo supervisorctl restart all

# Restart individual services
sudo supervisorctl restart frontend
sudo supervisorctl restart backend

# View service logs
tail -f /var/log/supervisor/frontend.*.log
tail -f /var/log/supervisor/backend.*.log
```

### Development Mode
```bash
# Frontend development
cd /app/frontend
yarn start

# Backend development  
cd /app/backend
python server.py
```

## 🔧 Configuration Details

### Frontend Configuration
- **Build Tool**: CRACO (Create React App Configuration Override)
- **CSS Framework**: Tailwind CSS
- **Component Library**: Shadcn/UI
- **HTTP Client**: Axios for API calls
- **Environment**: Production-ready build configuration

### Backend Configuration
- **Framework**: FastAPI with async support
- **Database**: MongoDB with Motor (async driver)
- **CORS**: Configured for cross-origin requests
- **API Prefix**: All routes prefixed with `/api`
- **Port Binding**: 0.0.0.0:8001 for container compatibility

### Kubernetes Ingress Rules
- **Frontend Routes**: Direct to port 3000
- **API Routes**: `/api/*` routes redirect to port 8001
- **External Access**: Configured via REACT_APP_BACKEND_URL

## 📦 Production Deployment

### Build Process
```bash
# Frontend production build
cd /app/frontend
yarn build

# Backend is Python - no build required
cd /app/backend
pip install -r requirements.txt
```

### Environment Preparation
1. **Database Setup**: Ensure MongoDB is accessible
2. **Environment Variables**: Configure production URLs
3. **SSL Certificates**: Set up HTTPS certificates
4. **CDN Configuration**: Configure static asset delivery

### Container Deployment
```dockerfile
# Frontend Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
```

```dockerfile
# Backend Dockerfile example
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8001
CMD ["python", "server.py"]
```

## 🌐 External Integrations

### TMDB API (Ready for Integration)
```bash
# Available API keys for movie data
TMDB_API_KEY_1=c8dea14dc917687ac631a52620e4f7ad
TMDB_API_KEY_2=3cb41ecea3bf606c56552db3d17adefd
```

### YouTube Integration
- **Current**: Embedded YouTube players for trailers
- **Implementation**: YouTube iframe API integration
- **Features**: Auto-play, custom controls, fullscreen support

## 🔐 Security Configuration

### Current Security Measures
- **CORS**: Configured for specific origins
- **Environment Variables**: Sensitive data stored in .env files
- **Input Validation**: Basic input sanitization

### Production Security (Recommended)
```bash
# Additional security headers
SECURE_SSL_REDIRECT=True
SECURE_HSTS_SECONDS=31536000
SECURE_CONTENT_TYPE_NOSNIFF=True
SECURE_BROWSER_XSS_FILTER=True
```

### Authentication Setup (Future)
```python
# JWT Configuration
JWT_SECRET_KEY=<secure_random_key>
JWT_ALGORITHM=HS256
JWT_EXPIRATION_DELTA=24  # hours
```

## 📊 Monitoring & Logging

### Current Logging
```bash
# Service logs
tail -f /var/log/supervisor/frontend.out.log
tail -f /var/log/supervisor/backend.out.log
tail -f /var/log/supervisor/backend.err.log
```

### Production Monitoring (Recommended)
- **Application Metrics**: Response times, error rates
- **Infrastructure Metrics**: CPU, memory, disk usage
- **User Analytics**: Page views, user interactions
- **Error Tracking**: Exception monitoring and alerting

## 🚀 Scaling Considerations

### Horizontal Scaling
- **Frontend**: CDN distribution, multiple server instances
- **Backend**: Load balancer with multiple API instances  
- **Database**: MongoDB replica sets and sharding

### Performance Optimization
- **Frontend**: Code splitting, lazy loading, image optimization
- **Backend**: Database indexing, caching layer, API optimization
- **CDN**: Static asset delivery, image optimization

## 🧪 Testing in Production

### Health Checks
```bash
# Frontend health check
curl http://localhost:3000/

# Backend health check  
curl http://localhost:8001/api/

# Database connectivity
curl http://localhost:8001/api/status
```

### Load Testing
```bash
# Example load testing commands
ab -n 1000 -c 10 http://localhost:3000/
ab -n 1000 -c 10 http://localhost:8001/api/
```

## 🔄 CI/CD Pipeline (Recommended)

### GitHub Actions Example
```yaml
name: Deploy Netflix Clone
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: yarn install
      - name: Build frontend
        run: yarn build
      - name: Deploy to production
        run: ./deploy.sh
```

### Deployment Script
```bash
#!/bin/bash
# deploy.sh
set -e

echo "Deploying Netflix Clone..."

# Build frontend
cd frontend && yarn build

# Restart services
sudo supervisorctl restart all

# Health check
curl -f http://localhost:3000/ || exit 1
curl -f http://localhost:8001/api/ || exit 1

echo "Deployment completed successfully!"
```

## 🛠️ Troubleshooting

### Common Issues

#### Services Not Starting
```bash
# Check supervisor status
sudo supervisorctl status

# Check logs for errors
tail -f /var/log/supervisor/*.log

# Restart problematic service
sudo supervisorctl restart <service_name>
```

#### Port Conflicts
```bash
# Check port usage
netstat -tulpn | grep :3000
netstat -tulpn | grep :8001

# Kill processes using ports
sudo kill -9 $(lsof -ti:3000)
sudo kill -9 $(lsof -ti:8001)
```

#### Database Connection Issues
```bash
# Test MongoDB connection
python -c "from motor.motor_asyncio import AsyncIOMotorClient; client = AsyncIOMotorClient('your_mongo_url'); print('Connected!')"
```

#### Frontend Build Issues
```bash
# Clear node modules and reinstall
cd frontend
rm -rf node_modules yarn.lock
yarn install
yarn build
```

### Performance Issues
```bash
# Check resource usage
htop
df -h
free -h

# Optimize images
# Implement lazy loading
# Enable gzip compression
```

## 📋 Deployment Checklist

### Pre-deployment
- [ ] Environment variables configured
- [ ] Database connectivity tested
- [ ] SSL certificates ready
- [ ] Backup strategy in place

### Deployment
- [ ] Code deployed to production
- [ ] Services restarted
- [ ] Health checks passed
- [ ] DNS records updated

### Post-deployment
- [ ] Application functionality verified
- [ ] Performance metrics normal
- [ ] Error monitoring active
- [ ] Backup completed

---

This deployment guide covers the current setup and provides roadmap for production deployment. The Netflix clone is designed to be production-ready with minimal additional configuration.