import express from "express"

const router = new express.Router()

const clientRoutes = ["/", "/songs/new", "/songs/:id"];
router.get(clientRoutes, (req, res) => {
  res.render("home")
})

export default router