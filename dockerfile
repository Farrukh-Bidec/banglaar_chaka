# Default values for NEXT_PUBLIC_* (defined once; override with docker build --build-arg)
ARG NEXT_PUBLIC_API_BASE_URL=http://backend.banglarchaka.com/api/
ARG NEXT_PUBLIC_BASE_IMAGE_URL_LIVE=http://backend.banglarchaka.com/storage/

# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
# Use npm install with --legacy-peer-deps to handle React 19 peer dependency conflicts
RUN npm ci

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Pick up ARG from above and set ENV (required at build time; API base must end with /)
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_BASE_IMAGE_URL_LIVE
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_BASE_IMAGE_URL_LIVE=$NEXT_PUBLIC_BASE_IMAGE_URL_LIVE

# Build Next.js application
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Pick up ARG from above and set ENV (server-side reads these at runtime)
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_BASE_IMAGE_URL_LIVE
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_BASE_IMAGE_URL_LIVE=$NEXT_PUBLIC_BASE_IMAGE_URL_LIVE

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy .env file for runtime (you'll copy this to server)
# Using wildcard so it works even if .env doesn't exist during build
COPY --chown=nextjs:nodejs .env* ./

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]