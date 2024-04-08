FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile


# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
ARG NODE_ENV=devolpement
RUN NODE_ENV=${NODE_ENV} yarn && \ 
    NODE_ENV=${NODE_ENV} yarn build


FROM node:18-alpine AS runner
WORKDIR /app
# RUN groupadd -g 1001 -r nodejs
# RUN useradd -r nextjs -u 1001
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/pages ./pages

USER nextjs
EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1
CMD ["yarn", "start"]