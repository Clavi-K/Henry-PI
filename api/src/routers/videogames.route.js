const { Router } = require("express")
const router = Router()

const controller = require("../controllers/videogames.controller")

router.get("/", controller.get)
router.get("/:id", controller.getId)

router.post("/", controller.post)

module.exports = router