import express from "express";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import nocache from "nocache";
import { setVideoDuration } from "./shared";
import controlRouter from "./routes/control";
import streamRouter from "./routes/stream";
import { Config } from "./config/config";


export const videoPath = path.join(__dirname, "movie", Config.videoFileName);
export const pausedVideoPath = path.join(__dirname, "movie", Config.pauseVideoFileName);

const PORT = Config.PORT;
const app = express();
app.use(express.json());
app.use(nocache());
app.use("/controls", controlRouter);
app.use("/stream", streamRouter);


ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.ffprobe(videoPath, (err, metadata) => {
    if (err){
        console.log(`Error getting video metadata`, err);
    }else{
        setVideoDuration(metadata.format.duration as number * 1000);
    }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));