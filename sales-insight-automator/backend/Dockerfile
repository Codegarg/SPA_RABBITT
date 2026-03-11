FROM node:18-alpine

# Set working directory
WORKDIR /app

# Ensure we are running as a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001

# Copy package descriptors
COPY package.json package-lock.json* ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy application source code
COPY . .

# Change ownership of the app directory to our non-root user
RUN chown -R nodeuser:nodejs /app

# Switch to non-root user
USER nodeuser

# Set environment variable to production
ENV NODE_ENV=production

# Expose the API port
EXPOSE 5000

# Start the server
CMD ["node", "src/index.js"]
