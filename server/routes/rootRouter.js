import express from "express"

import clientRouter from "./clientRouter.js"
import songsRouter from "./api/v1/songsRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/songs", songsRouter)

rootRouter.use("/", clientRouter)

export default rootRouter
