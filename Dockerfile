# Simple Dockerfile for NestJS + Prisma + MySQL (npm)

FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install tools needed for waiting on DB + Prisma
RUN apk add --no-cache bash netcat-openbsd openssl

# Install dependencies (only production deps in the final image if you like)
COPY package*.json ./
RUN npm ci

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the source code
COPY . .

# Build NestJS app (assumes "build" script in package.json -> nest build)
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000

# Wait for the DB, run migrations, then start NestJS
# Assumes:
#   - DB service is called "db" and listens on 3306 (from docker-compose)
#   - package.json has "start:prod": "node dist/main.js"
CMD sh -c "\
  echo 'Waiting for MySQL...' && \
  until nc -z db 3306; do echo '  -> still waiting...'; sleep 3; done && \
  echo 'MySQL is up, running migrations...' && \
  npx prisma migrate deploy && \
  echo 'Starting NestJS app...' && \
  npm run start:prod \
"
