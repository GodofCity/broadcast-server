import { Router } from "express";
import { isPlaying, setIsPlaying, startTime, setStartTime } from "../shared";
import { localhostOnly } from "../middlewares/localhostOnly";

const router = Router();

router.post("/play", localhostOnly, (req, res) => {
    if (!isPlaying) {
        setIsPlaying(true);
        setStartTime(startTime ?? Date.now());
        res.status(200).send({ message: "Video has started" });
    } else {
        res.status(400).send({ message: "Video is already playing" });
    }
});

router.post("/pause", localhostOnly, (req, res) => {
    if (isPlaying) {
        setIsPlaying(false);

        console.log("Video paused");

        res.status(200).send({ message: "Video paused" });
    } else {
        res.status(400).send({ message: "Video is already paused" });
    }
});


export default router;
