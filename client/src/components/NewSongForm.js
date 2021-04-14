import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"

const NewSongForm = (props) => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [newSong, setNewSong] = useState({
    title: "",
    movie: "",
    length: ""
  })

  const handleInputChange = (event) => {
    setNewSong({
      ...newSong,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const postNewSong = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch("/api/v1/songs", {
        method: "POST",
        credentials: "same-origin",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newSong)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      console.log("New Song was added successfully!")
      setShouldRedirect(true)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  if (shouldRedirect) {
    return <Redirect to="/" />
  }

  return (
    <>
      <h4><Link to="/">Back to Home</Link></h4>

      <h1>New Favorite Song</h1>
      <form onSubmit={postNewSong}>
        <label htmlFor="songTitle">
          Title
          <input
            id="songTitle"
            type="text"
            name="title"
            onChange={handleInputChange}
            value={newSong.title}
          />
        </label>

        <label htmlFor="songMovie">
          Movie
          <input
            id="songMovie"
            type="text"
            name="movie"
            onChange={handleInputChange}
            value={newSong.movie}
          />
        </label>
        
        <label htmlFor="songLength">
          Length
          <input
            id="songLength"
            type="text"
            name="length"
            onChange={handleInputChange}
            value={newSong.length}
          />
        </label>
        <input type="submit" className="button" />
      </form>
    </>
  )
}

export default NewSongForm
