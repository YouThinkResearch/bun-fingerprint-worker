FROM oven/bun:latest AS builder

# Create app directory
WORKDIR /app

# Copy dependency manifests first for better layer caching
COPY package.json bun.lock ./

# Install all dependencies (including dev) for the build step
RUN bun install

# Copy the rest of the source code
COPY . .

# Build the project (outputs to ./dist)
RUN bun run build

# ──────────────────────────────────────────────────────────
# Final image – include only dist/fingerprint* artifacts
FROM oven/bun:slim

WORKDIR /app

# Copy the build artefacts
COPY --from=builder /app/dist/fingerprint* ./dist/

# Default command (can be overridden) – executes the compiled worker script
CMD ["bun", "dist/fingerprintjs-pro-cloudflare-worker.esm.js"] 