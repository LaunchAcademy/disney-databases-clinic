import express from "express"

import Song from "../../../models/Song.js"

const songsRouter = express.Router()

songsRouter.get("/", async (req, res) => {
  try { 
    const allSongs = await Song.findAll()
    res.json({ songs: allSongs })
  }
  catch(error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

songsRouter.get("/:id", async (req, res) => {
  const songId = req.params.id
  try { 
    const song = await Song.findById(songId)
    res.json({ song })
  }
  catch(error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

songsRouter.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const song = new Song(req.body)
    const persistedSong = await song.save()
    console.log(persistedSong)
    res.status(201).json({ song })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

export default songsRouter
