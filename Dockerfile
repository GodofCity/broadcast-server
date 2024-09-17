FROM node:20-alpine
WORKDIR /app
COPY ["package.json", "tsconfig.json", "./"]
COPY . .
RUN apk update && apk add ffmpeg
RUN npm install -g pnpm && pnpm install
CMD ["pnpm", "dev"]