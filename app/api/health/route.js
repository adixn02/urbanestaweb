export async function GET() {
  try {
    // Basic health check for ALB
    const healthData = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || "1.0.0",
      port: process.env.PORT || 3012,
      nodeEnv: process.env.NODE_ENV || "production"
    };

    // Return 200 status for ALB health checks
    return Response.json(healthData, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (error) {
    // Return 503 for unhealthy state
    return Response.json(
      { 
        status: "unhealthy", 
        error: error.message,
        timestamp: new Date().toISOString()
      }, 
      { 
        status: 503,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      }
    );
  }
}