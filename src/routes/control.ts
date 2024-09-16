import { Router } from "express";
import { isPlaying, setIsPlaying, startTime, setStartTime } from "../shared";
import { localhostOnly } from "../middlewares/localhostOnly";

const router = Router();

router.post("/play", localhostOnly, (req, res) => {
    if (isPlaying) return res.status(400).send({ message: "Video is already playing" });

    setIsPlaying(true);
    setStartTime(startTime ?? Date.now());
    res.status(200).send({ message: "Video has started" });    
});

router.post("/pause", localhostOnly, (req, res) => {
    if (!isPlaying) return res.status(400).send({ message: "Video is already paused" });

    setIsPlaying(false);
    console.log("Video paused");
    res.status(200).send({ message: "Video paused" });
});

router.post("/set", localhostOnly, (req, res) => {
    if (!isPlaying) return res.status(400).send({ message: "There is no playing video" });
    const body = req.body;
    const bodyTime = body.time;

    if (!bodyTime) return res.status(400).send({ message: "No time specified" });

    const timeInMiliSeconds = bodyTime * 60 * 1000;
    const newStartingTime = Date.now() - timeInMiliSeconds;

    setStartTime(newStartingTime);

    res.status(200).send({ message: "Current time is successfully set" });
});

export default router;
