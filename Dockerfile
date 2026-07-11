# Vite SPA + Vercel-style api/ functions, served by a small Express server on :3000.
# API secrets (RESEND_API_KEY, etc.) are RUNTIME env on Dokploy, NOT build args.
# Does not affect Vercel.

FROM node:22-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/api ./api
COPY --from=build /app/src ./src
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/package.json ./package.json
EXPOSE 3000
CMD ["node", "server.js"]
