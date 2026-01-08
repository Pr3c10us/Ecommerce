# ===== Backend Dockerfile =====
# Node.js Express API Server

# ---- Build Stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for any build steps)
RUN npm ci

# Copy application source
COPY . .

# ---- Production Stage ----
FROM node:20-alpine AS production

WORKDIR /app

# Install PM2 globally for process management
RUN npm install -g pm2

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy application source from builder
COPY --from=builder /app/app.js ./
COPY --from=builder /app/controller ./controller
COPY --from=builder /app/errors ./errors
COPY --from=builder /app/middleware ./middleware
COPY --from=builder /app/models ./models
COPY --from=builder /app/mongoDb ./mongoDb
COPY --from=builder /app/routes ./routes
COPY --from=builder /app/azure ./azure

# Change ownership to non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose the application port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5000/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))" || exit 1

# Start the application with PM2
CMD ["pm2-runtime", "start", "app.js"]
