FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:24-bookworm-slim AS runtime
ENV NODE_ENV=production
ENV PORT=4011
ENV KZ_DATA_DIR=/var/lib/tripsoda-kz
WORKDIR /app
COPY --from=build --chown=node:node /app/package.json /app/package-lock.json ./
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/.next ./.next
COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/next.config.js ./next.config.js
RUN mkdir -p /var/lib/tripsoda-kz && chown node:node /var/lib/tripsoda-kz && chmod 700 /var/lib/tripsoda-kz
USER node
EXPOSE 4011
VOLUME ["/var/lib/tripsoda-kz"]
CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "4011"]
