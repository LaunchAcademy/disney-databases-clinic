import React from "react"
import { Link } from "react-router-dom"

const SongTile = ({ id, title, movie, length }) => {
  return (
    <div className="callout">
      <h4><Link to={`/songs/${id}`}>{title}</Link></h4>
      <p>{movie}</p>
      <p>{length}</p>
    </div>
  )
}

export default SongTile
