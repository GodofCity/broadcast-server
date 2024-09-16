FROM node:20-alpine
WORKDIR /app
COPY ["package.json", "tsconfig.json", "./"]
COPY . .
RUN apk update
RUN apk add
RUN apk add ffmpeg
RUN npm install -g pnpm && pnpm install
EXPOSE 3000
CMD ["pnpm", "dev"]