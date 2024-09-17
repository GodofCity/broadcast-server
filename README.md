### Hello Adventurer.

You have two options to run this application.

##### 1. Docker

if you have Windows, you will need to download Docker Desktop from this link: https://www.docker.com/products/docker-desktop/

You need to open a CMD/Bash and navigate to the folder where you downloaded the repository. After you successfully managed to do it, you will need to build down the docker image.

```bash
docker build -t broadcast .
```
If you successfully built the image, you just need to start the container with a single line command.

```bash
docker compose up
```

##### 2. NodeJS

You will need to download NodeJS and ffmpeg to do this way. 
NodeJS: https://nodejs.org/en
ffmpeg: https://www.ffmpeg.org/download.html

You need to open a CMD/Bash and navigate to the folder where you downloaded the repository and use this command.

```bash
npm run dev
```

Just put the video into movie folder and change the videoPath variable to the right movie title. That's all! You need to use MP4 video format.

##### API
```
localhost:3000/stream - Streaming the video, if it's started
localhost:3000/play - It starts the video
localhost:3000/pause - It pauses the video
```