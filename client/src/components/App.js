import React from "react"
import { hot } from "react-hot-loader/root"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import "../assets/main.css"

import SongsList from "./SongsList"
import SongShow from "./SongShow"
import NewSongForm from "./NewSongForm"

const App = props => {
  return (
    <div className="grid-container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SongsList} />
          <Route exact path="/songs/new" component={NewSongForm} />
          <Route exact path="/songs/:id" component={SongShow} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default hot(App)
