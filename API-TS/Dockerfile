FROM node:20

WORKDIR /api-ts
COPY package.json .
COPY . .
RUN npm cache clean --force
RUN npm install
RUN npx prisma generate
EXPOSE 8080
CMD npm run dev
