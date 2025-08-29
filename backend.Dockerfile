FROM node:18-alpine
WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install --omit=dev || npm install

COPY backend/ .
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# backend/package.json 里要有 "start": "node server.js"
CMD ["npm","start"]
