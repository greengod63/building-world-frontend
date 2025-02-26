export const getAudioLevels = (blob: Blob): Promise<number[]> => {
  // Return a new promise
  return new Promise(async (resolve, reject) => {
    try {
      // Convert the audio blob to an array buffer
      const arrayBuffer = await blob.arrayBuffer();
      // Create a new AudioContext
      const audioCtx = new AudioContext();
      // Decode the audio data from the array buffer
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      // Create a new buffer source and set its buffer to the decoded audio data
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;

      // Create a new analyser node and set its properties
      const analyser = audioCtx.createAnalyser();
      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;
      analyser.fftSize = 2048;

      // Connect the buffer source to the analyser node
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      // Get the frequency bin count and create a new Uint8Array to hold the audio data
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const levels: number[] = [];

      // Start playing the audio
      source.start();

      // Set an interval to update the audio levels every 500ms
      const intervalId = setInterval(() => {
        // Get the frequency data from the analyser node
        analyser.getByteFrequencyData(dataArray);
        // Calculate the average value of the frequency data and scale it to a percentage value
        const sum = dataArray.reduce((acc, curr) => acc + curr, 0);
        const avg = sum / dataArray.length;
        const scaledLevel = Math.floor((avg / 255) * 100);
        // Push the scaled level to the levels array
        levels.push(scaledLevel);
      }, 500);

      // When the audio finishes playing, clear the interval and resolve the promise with the levels array
      source.addEventListener("ended", () => {
        clearInterval(intervalId);
        resolve(levels);
      });
    } catch (error) {
      // If there's an error, reject the promise with the error
      reject(error);
    }
  });
};
