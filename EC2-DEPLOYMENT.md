# Urbanesta Frontend - EC2 Deployment Guide

This guide covers deploying the Urbanesta frontend to EC2 with nginx proxy and PM2 process management.

## Prerequisites

- EC2 instance with Ubuntu/Amazon Linux
- Node.js 18+ installed
- PM2 installed globally
- Nginx configured (see user-data script)
- Git access to this repository

## Quick Deployment Steps

### 1. Connect to your EC2 instance
```bash
ssh ubuntu@<YOUR_EC2_IP>
# or
ssh ec2-user@<YOUR_EC2_IP>
```

### 2. Navigate to web directory
```bash
cd ~/web
```

### 3. Clone the repository
```bash
# For public repository
git clone https://github.com/your-username/urbanesta-frontend.git .

# For private repository (use deploy key or token)
git clone https://your-token@github.com/your-username/urbanesta-frontend.git .
```

### 4. Set up environment variables (optional)
```bash
# Copy the environment template
cp env.template .env.production

# Edit the environment file if needed
nano .env.production
```

### 5. Install dependencies and build
```bash
# Install dependencies
npm ci

# Build the application
npm run build
```

### 6. Start the application with PM2
```bash
# Start using the ecosystem configuration
pm2 start ecosystem.config.js

# Save PM2 configuration for auto-restart on reboot
pm2 save

# Check status
pm2 status
```

### 7. Verify deployment
```bash
# Test local health endpoint
curl -I http://127.0.0.1:3012/api/health

# Test through nginx (from EC2)
curl -I http://localhost/api/health

# Test from external (replace with your ALB DNS)
curl -I http://<ALB_DNS>/api/health
```

## Configuration Details

### Port Configuration
- **Application Port**: 3012 (configured in ecosystem.config.js)
- **Nginx Port**: 80 (proxies to 3012)
- **ALB Target Group**: Should point to instance port 80

### Health Check Configuration
- **ALB Health Check Path**: `/api/health`
- **Health Check Port**: 80 (nginx proxy)
- **Expected Response**: HTTP 200 with JSON status

### PM2 Process Management
- **Process Name**: `urbanesta-frontend`
- **Auto-restart**: Enabled
- **Memory Limit**: 1GB
- **Logs**: Stored in `./logs/` directory

## Useful PM2 Commands

```bash
# View logs
pm2 logs urbanesta-frontend

# Restart application
pm2 restart urbanesta-frontend

# Stop application
pm2 stop urbanesta-frontend

# Delete application
pm2 delete urbanesta-frontend

# Monitor in real-time
pm2 monit

# View process list
pm2 list
```

## Nginx Configuration

The nginx configuration (already set up by user-data script):
- Listens on port 80
- Proxies all requests to `127.0.0.1:3012`
- Handles static assets with proper caching
- Includes health check proxy for ALB

## Environment Variables

The application uses these environment variables:
- `PORT`: 3012 (default)
- `NODE_ENV`: production
- `HOSTNAME`: 127.0.0.1

## Troubleshooting

### Application won't start
```bash
# Check PM2 logs
pm2 logs urbanesta-frontend

# Check if port is in use
sudo netstat -tlnp | grep 3012

# Restart PM2
pm2 restart all
```

### Health check failing
```bash
# Test health endpoint directly
curl -v http://127.0.0.1:3012/api/health

# Check nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Nginx issues
```bash
# Test nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx

# Check nginx status
sudo systemctl status nginx
```

## Security Considerations

1. **Firewall**: Ensure only port 80 is open for HTTP traffic
2. **SSL**: Consider adding SSL termination at ALB level
3. **Updates**: Regularly update dependencies and system packages
4. **Monitoring**: Set up CloudWatch or similar monitoring

## Performance Optimization

1. **PM2 Clustering**: For high traffic, consider using PM2 cluster mode
2. **Nginx Caching**: Static assets are cached by nginx
3. **CDN**: Consider using CloudFront for global content delivery
4. **Compression**: Nginx gzip compression is enabled

## Backup and Recovery

1. **Code Backup**: Repository serves as code backup
2. **PM2 Configuration**: `pm2 save` backs up process configuration
3. **Nginx Configuration**: Backed up in `/etc/nginx/sites-available/`
4. **Logs**: Application logs in `./logs/` directory

## Monitoring

- **Application Health**: `/api/health` endpoint
- **PM2 Status**: `pm2 status` command
- **Nginx Status**: `sudo systemctl status nginx`
- **System Resources**: `htop` or `top` commands
