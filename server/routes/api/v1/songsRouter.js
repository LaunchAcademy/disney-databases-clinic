import express from "express"

import Song from "../../../models/Song.js"

const songsRouter = express.Router()

songsRouter.get("/", async (req, res) => {
  try {
    // get all of the songs from the database
    // (via the model!)
    // we need to await this so that `findAll` has time to query the database
    const songs = await Song.findAll()
    // console.log(songs)
  
    // send that data as a JSON response
    res.json({ songs: songs })
    
  } catch(err) {
    // if anything goes wrong,
    // catch it and console.log(errors), and respond with the error
    console.log(err)
    res.status(500).json({ error: err })
  }
})

songsRouter.get("/:id", async (req,res) => {
  try {
    const id = req.params.id
    // I want to take the id from my URL
    // and get the record in the database with the matching id
    // (I'm going to do this using my model)
    const singleSong = await Song.findById(id)

    // send that data for the single song as a JSON response
    res.json({ song: singleSong })
  } catch(err) {
    console.error(err)
    res.status(500).json({ error: err })
  }
})

export default songsRouter
