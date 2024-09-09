import { Router } from "express";
import { isPlaying, startTime, videoDuration } from "../shared";
import { pausedVideoPath, videoPath } from "../app";
import ffmpeg from "fluent-ffmpeg";

const router = Router();

router.get("/", (req, res) => {
    if (!isPlaying){
        return ffmpeg(pausedVideoPath)
            .setStartTime(0)
            .outputOptions('-movflags +frag_keyframe+empty_moov')
            .outputOptions("-c:v copy")
            .outputOptions("-c:a copy")
            .format("mp4")
            .on("end", () => console.log("Stream ended"))
            .on("error", (err) => {
                console.error("Error during streaming", err);
                // res.sendStatus(500);
            })
            .pipe(res, { end: true });
    }
    if (!startTime){
        return res.status(400).send({ message: "Video has not started yet" });
    }

    let elapsed = isPlaying ? Date.now() - startTime: videoDuration - startTime;

    if (elapsed >= videoDuration){
        elapsed = videoDuration;
    }

    const startSeconds = elapsed / 1000;

    ffmpeg(videoPath)
        .setStartTime(startSeconds)
        .outputOptions('-movflags +frag_keyframe+empty_moov')
        .outputOptions("-c:v copy")
        .outputOptions("-c:a copy")
        .format("mp4")
        // .on("stderr", (stderrLine) => console.error("ffmpeg stderr:", stderrLine))
        .on("end", () => console.log("Stream ended"))
        .on("error", (err) => {
            console.error("Error during streaming", err);
            // res.sendStatus(500);
        })
        .pipe(res, { end: true });
});

export default router;