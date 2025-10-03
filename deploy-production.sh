#!/bin/bash

# Frontend Production Deployment Script for Bootstrap CSS Path Fix
# ================================================================
# This script ensures proper Bootstrap loading in production with nginx reverse proxy

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Frontend Production Deployment...${NC}"

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    case $status in
        "success") echo -e "${GREEN}✅ $message${NC}" ;;
        "error") echo -e "${RED}❌ $message${NC}" ;;
        "warning") echo -e "${YELLOW}⚠️  $message${NC}" ;;
        "info") echo -e "${BLUE}ℹ️  $message${NC}" ;;
    esac
}

# Check if we're in the frontend directory
if [ ! -f "package.json" ] || [ ! -f "next.config.mjs" ]; then
    print_status "error" "This script must be run from the frontend directory"
    exit 1
fi

print_status "info" "Setting up Bootstrap CSS fallback files..."

# Create public/css directory if it doesn't exist
mkdir -p public/css

# Copy Bootstrap CSS files to public directory for fallback
if [ -f "node_modules/bootstrap/dist/css/bootstrap.min.css" ]; then
    cp node_modules/bootstrap/dist/css/bootstrap.min.css public/css/
    print_status "success" "Bootstrap CSS copied to public/css/"
else
    print_status "warning" "Bootstrap CSS not found in node_modules - make sure to run npm install first"
fi

# Copy Bootstrap Icons files
if [ -f "node_modules/bootstrap-icons/font/bootstrap-icons.css" ]; then
    cp node_modules/bootstrap-icons/font/bootstrap-icons.css public/css/
    print_status "success" "Bootstrap Icons CSS copied to public/css/"
else
    print_status "warning" "Bootstrap Icons CSS not found in node_modules"
fi

# Copy Bootstrap Icons font files
if [ -d "node_modules/bootstrap-icons/font/fonts" ]; then
    cp -r node_modules/bootstrap-icons/font/fonts public/css/
    print_status "success" "Bootstrap Icons fonts copied to public/css/"
else
    print_status "warning" "Bootstrap Icons fonts not found in node_modules"
fi

print_status "info" "Installing production dependencies..."
npm ci --production

print_status "info" "Building Next.js application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    print_status "success" "Next.js build completed successfully"
else
    print_status "error" "Next.js build failed"
    exit 1
fi

print_status "info" "Validating Bootstrap setup..."

# Check if fallback files exist
if [ -f "public/css/bootstrap.min.css" ] && [ -f "public/css/bootstrap-icons.css" ]; then
    print_status "success" "Bootstrap fallback files are ready"
else
    print_status "error" "Bootstrap fallback files are missing"
    exit 1
fi

print_status "info" "Setting up PM2 configuration..."

# Start or restart the application with PM2
if pm2 describe urbanesta-frontend > /dev/null 2>&1; then
    print_status "info" "Restarting existing PM2 process..."
    pm2 restart urbanesta-frontend
else
    print_status "info" "Starting new PM2 process..."
    pm2 start ecosystem.config.js --env production
fi

# Save PM2 configuration
pm2 save

print_status "info" "Validating deployment..."

# Wait a moment for the application to start
sleep 5

# Test health endpoint
if curl -f http://127.0.0.1:3012/api/health > /dev/null 2>&1; then
    print_status "success" "Health check passed - application is running"
else
    print_status "error" "Health check failed - check PM2 logs"
    pm2 logs urbanesta-frontend --lines 20
    exit 1
fi

print_status "success" "Frontend deployment completed successfully!"

echo -e "${BLUE}📋 Next Steps:${NC}"
echo "1. Update nginx configuration:"
echo "   sudo cp nginx-frontend-production.conf /etc/nginx/sites-available/urbanesta-frontend"
echo "   sudo ln -sf /etc/nginx/sites-available/urbanesta-frontend /etc/nginx/sites-enabled/"
echo "   sudo nginx -t && sudo systemctl reload nginx"
echo ""
echo "2. Test the application:"
echo "   curl -I http://your-domain.com/api/health"
echo ""
echo "3. Monitor with PM2:"
echo "   pm2 status"
echo "   pm2 logs urbanesta-frontend"
echo ""
echo "4. CDN Bootstrap URLs used:"
echo "   - CSS: https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
echo "   - Icons: https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
echo "   - JS: https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
echo ""
echo "5. Fallback files available at:"
echo "   - /css/bootstrap.min.css"
echo "   - /css/bootstrap-icons.css"

print_status "success" "Deployment script completed! 🎉"