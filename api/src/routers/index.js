const { Router } = require('express');
const axios = require("axios")

const { Videogame } = require("../db")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.post("/", async (req, res) => {

    const { name, descrription, platforms } = req.body

    try {

        const response = await Videogame.create(req.body)
        return res.status(201).send(response.toJSON())

    } catch (e) {
        console.log(e)
        return res.status(400).send("An error has ocurred")
    }

})

router.get("/", async (req, res) => {

    const videogame = await Videogame.findByPk(1)
    return res.send(videogame)

})

router.get("/api", async (req, res) => {

    try {
        const response = await axios.get("https://api.rawg.io/api/games?key=45d9cdd3e5ba4943907cc3b1c3c21e96&page_size=14")
        return res.send(response.data.results)
    } catch (e) {
        console.log(e)
        return res.status(400).send({ message: e.message.toString() })
    }

})

module.exports = router;
