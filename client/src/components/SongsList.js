import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import SongTile from "./SongTile"

const SongsList = () => {
  const [songs, setSongs] = useState([])

  const getSongs = async () => {
    try {
      const response = await fetch("/api/v1/songs")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      setSongs(body.songs)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getSongs()
  }, [])

  const songTiles = songs.map(songObject => {
    const { id, title, movie, length } = songObject
    return <SongTile key={id} id={id} title={title} movie={movie} length={length} />
  })

  return (
    <div className="callout">
      <h1>My Favorite Songs</h1>
      {songTiles}
      <Link to="/songs/new">
        <h3>Add New Song</h3>
      </Link>
    </div>
  )
}

export default SongsList
