import express from "express"

import Song from "../../../models/Song.js"

const songsRouter = express.Router()

// Route for the fetch request in the SongsList component
songsRouter.get("/", async (req, res) => {
  try {
    // Use model to retrieve all the Songs as an array
    const songs = await Song.findAll()

    // Everything is good
    // Pass back json with the key/value pair that the SongsList component is expecting (go look at it!)
    res.status(200).json({ songs: songs })
  } catch (error) {
    // Something went wrong
    // Send back json with the thrown error
    console.error(error)
    res.status(500).json({ error: error })
  }
})

// Route for the fetch request in the SongShow component
songsRouter.get("/:id", async (req, res) => {
  try {
    // Use model to retrieve the song that matches the params
    const song = await Song.findById(req.params.id)

    if (song) {
      // Song was found and returned from model
      // Pass back json with the key/value pair that the SongsList component is expecting (go look at it!)
      res.status(200).json({ song: song })
    } else {
      // findById wasn't able to find song that matches
      res.status(404).send("Song not found")
    }
  } catch (error) {
    // Something went wrong
    // Send back json with the thrown error
    res.status(500).json({ error: error })
  }
})

songsRouter.post("/", async (req, res) => {
  try {
    // take the user input and create a new instance of our model (Song)
    const newSong = new Song(req.body)
    // save a new Song record to the database
    await newSong.save()
    // if successful, send that record back to the frontend
    res.status(201).json({ song: newSong })
  } catch(err) {
    // log error
    console.error(err)
    // respond with a 500 status
    res.status(500).json({ errors: error })
  }
})

export default songsRouter
