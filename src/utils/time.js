export const getPadTime = (time) => time.toString().padStart(2, '0');
export const getFormattedTimeString = (seconds) =>
    getPadTime(Math.floor(seconds / 60)) + ':' + getPadTime(seconds % 60);