FROM node:lts-alpine@sha256:bb776153f81d6e931211e3cadd7eef92c811e7086993b685d1f40242d486b9bb AS compiler
RUN apk add --no-cache libc6-compat
WORKDIR /frontend
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
ENV NEXT_PUBLIC_ASSETS_URL https://assets.aquaeconomics.liobr.dev
ENV NEXT_PUBLIC_IMAGES_URL ${NEXT_PUBLIC_ASSETS_URL}/media/images
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
RUN npm run build

FROM node:lts-alpine@sha256:bb776153f81d6e931211e3cadd7eef92c811e7086993b685d1f40242d486b9bb AS cleanup
WORKDIR /frontend
COPY --from=compiler /frontend/.next ./.next
COPY --from=compiler /frontend/public ./public
COPY --from=compiler /frontend/package.json ./package.json
COPY --from=compiler /frontend/package-lock.json ./package-lock.json
RUN npm install --omit=dev

FROM node:lts-alpine@sha256:bb776153f81d6e931211e3cadd7eef92c811e7086993b685d1f40242d486b9bb AS runner
WORKDIR /frontend
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
COPY --from=cleanup --chown=nextjs:nodejs /frontend ./
EXPOSE 3000
