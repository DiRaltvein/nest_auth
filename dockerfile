FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci
COPY src ./
COPY prisma ./
COPY tsconfig*.json ./
RUN npx prisma generate
RUN npm run build
RUN rm -rf ./node_modules
RUN npm ci --only=production

FROM node:18-alpine As production
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
EXPOSE 3000