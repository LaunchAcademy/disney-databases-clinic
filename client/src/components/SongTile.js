import React from "react"
import { Link } from "react-router-dom"

const SongTile = ({ id, title }) => {
  return (
    <div className="callout">
      <h4><Link to={`/songs/${id}`}>{title}</Link></h4>
    </div>
  )
}

export default SongTile
