# ---------- Stage 1: Install frontend dependencies ----------
FROM node:23-alpine AS deps-app
WORKDIR /app

# Install dependencies only (cached unless package.json changes)
COPY app/package.json app/package-lock.json* ./
RUN npm ci

# ---------- Stage 2: Build the frontend ----------
FROM deps-app AS build-app
# Copy frontend source code and build
COPY app/ ./
RUN npm run build

# ---------- Stage 3: Install backend dependencies ----------
FROM node:23-alpine AS deps-api
WORKDIR /api

# Install backend dependencies only
COPY api/package.json api/package-lock.json* ./
RUN npm ci

# ---------- Stage 4: Build the backend ----------
FROM deps-api AS build-api
# Copy backend source code and build
COPY api/ ./
RUN npm run build

# ---------- Stage 5: Setup AI dependencies ----------
FROM python:3.10-slim-buster AS deps-ai
WORKDIR /ai

# Install AI dependencies
COPY ai/requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt

# ---------- Stage 6: Build the AI service ----------
FROM deps-ai AS build-ai
# Copy AI source code
COPY ai/ ./

# ---------- Stage 7: Final runtime image ----------
FROM node:23-alpine AS runner

# Install Python and pip for AI service
RUN apk add --no-cache python3 py3-pip

# Install tini for proper signal handling
RUN apk add --no-cache tini

# Install PM2 globally to run frontend, backend, and AI
RUN npm install -g pm2

WORKDIR /workspace

# Copy built frontend, backend, and AI from build stages
COPY --from=build-app /app ./app
COPY --from=build-api /api ./api
COPY --from=build-ai /ai ./ai

# Copy PM2 ecosystem config
COPY ecosystem.config.js ./

# Expose frontend, backend, and AI ports
EXPOSE 3000 5000 8000

# Use tini as init system to handle signals properly
ENTRYPOINT ["/sbin/tini", "--"]

# Start both processes using PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
