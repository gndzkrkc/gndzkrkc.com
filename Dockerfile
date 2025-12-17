FROM oven/bun:canary-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun ci

FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV BUILD_NEXT_STANDALONE=1
RUN bun run build

FROM base AS production
WORKDIR /app
ENV PORT=3000
ENV NODE_ENV=production

# Install runtime dependencies
# Next.js uses Sharp for image optimization which requires libc6-compat on Alpine
RUN apk add --no-cache libc6-compat

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the "Standalone" build
COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["bun", "server.js"]
