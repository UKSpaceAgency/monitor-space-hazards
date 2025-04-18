# syntax=docker/dockerfile:1.2
FROM node:22-alpine AS base


# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g corepack
RUN corepack enable
RUN corepack prepare pnpm@10.2.0 --activate
RUN pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1
ENV COREPACK_DEFAULT_TO_LATEST 0

RUN --mount=type=secret,id=cosmic-slug \
    --mount=type=secret,id=cosmic-key \
    --mount=type=secret,id=mapbox-token \
    --mount=type=secret,id=public-ga \
    export COSMIC_BUCKET_SLUG=$(cat /run/secrets/cosmic-slug) && \
    export COSMIC_READ_KEY=$(cat /run/secrets/cosmic-key) && \
    export NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=$(cat /run/secrets/mapbox-token) && \
    export NEXT_PUBLIC_PUBLIC_GA=$(cat /run/secrets/public-ga) && \
    corepack enable pnpm && SKIP_ENV_VALIDATION=1 pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
RUN apk add curl
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1
ENV COREPACK_DEFAULT_TO_LATEST 0

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]