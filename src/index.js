import express from 'express'
import cors from 'cors'

import { downloader } from './apis/ytb-download.js'
import { createMP3 } from './adapters/create-mp3.js'
import { transcribeAudio } from './apis/transcribe.js'
import { separateVoices } from './adapters/separate-voices.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/audio', async (req, res) => {
  const videoId = req.query.v

  try {
    //await downloader(videoId)
    //await createMP3()
    
    //const data = await transcribeAudio()

    separateVoices("/Volumes/Hyundai 1/dev/rxmz/Javascript/gptapi/audio.mp3")
    .then(separatedAudio => {
      console.log('Separation completed:', separatedAudio);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    return res.send({ message: "OK" })
  }
  catch (err) {
    res.send(err)
  }
})

app.listen(3333, () => console.log("listening on 3333"))