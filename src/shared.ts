export let isPlaying = false;
export const setIsPlaying = (status: boolean) => {
    isPlaying = status;
}

export let startTime: number | null = null;
export const setStartTime = (newStartTime: number | null) => {
    startTime = newStartTime;
} 

export let videoDuration: number = 0;
export const setVideoDuration = (newDuration: number) => {
    videoDuration = newDuration;
};