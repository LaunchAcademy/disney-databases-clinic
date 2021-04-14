import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const SongShow = (props) => {
  const [song, setSong] = useState({})

  const getSong = async () => {
    const id = props.match.params.id

    try {
      const response = await fetch(`/api/v1/songs/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage);
        throw(error);
      }
      const fetchedData = await response.json()
      setSong(fetchedData.song)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getSong()
  }, [])

  return(
    <>
      <h4><Link to="/">Back to Home</Link></h4>

      <h1>Title: {song.title}</h1>
      <h2>Movie: {song.movie}</h2>
      <h3>Length: {song.length}</h3>
    </>
  )
}

export default SongShow
