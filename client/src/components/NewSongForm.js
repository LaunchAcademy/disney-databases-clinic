import React, { useState } from "react"
import { Redirect } from "react-router-dom"

const NewSongForm = props => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [newSong, setNewSong] = useState({
    title: "",
    movie: "",
    length: "",
    characterName: ""
  })

  const handleInputChange = event => {
    setNewSong({
      ...newSong,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const postNewSong = async event => {
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
      <h1>New Favorite Song</h1>
      <form onSubmit={postNewSong}>
        <label>
          Title
          <input type="text" name="title" onChange={handleInputChange} value={newSong.title} />
        </label>
        <label>
          Movie
          <input
            type="text"
            name="movie"
            onChange={handleInputChange}
            value={newSong.movie}
          />
        </label>
        <label>
          Length
          <input
            type="text"
            name="length"
            onChange={handleInputChange}
            value={newSong.length}
          />
        </label>
        <label>
          Character Name
          <input
            type="text"
            name="characterName"
            onChange={handleInputChange}
            value={newSong.characterName}
          />
        </label>
        <input type="submit" className="button" />
      </form>
    </>
  )
}

export default NewSongForm
