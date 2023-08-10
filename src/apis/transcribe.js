import dotenv from 'dotenv';
import fs from 'fs';

import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const transcribeAudio = async () => {
  const resp = await openai.createTranscription(
    fs.createReadStream("/Volumes/Hyundai 1/dev/rxmz/Javascript/gptapi/audio.mp3"),
    "whisper-1",
    "Este audio é",
    "text",
    0,
    "pt"
  );

  return resp.data
}