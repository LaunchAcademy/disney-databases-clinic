import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import _ from "lodash"

import ErrorList from "./ErrorList"

const NewSongForm = (props) => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  // const [persistedSongId, setPersistedSongId] = useState(null)
  const [errors, setErrors] = useState({})
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

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["title", "movie", "length"]
    requiredFields.forEach(field => {
      if (newSong[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        }
      }
    })

    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const postNewSong = async (event) => {
    event.preventDefault()
    
    if (validForSubmission()) {
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
        // const responseBody = await response.json()
        // setPersistedSongId(responseBody.song.id)
        setShouldRedirect(true)
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`)
      }
    }
  }

  if (shouldRedirect) {
    return <Redirect to="/" />
    // return <Redirect to={`/songs/${persistedSongId}`} />
  }

  return (
    <>
      <h4><Link to="/">Back to Home</Link></h4>

      <h1>New Favorite Song</h1>
      <ErrorList errors={errors} />
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
