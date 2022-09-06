const service = require("../services/videogames.service")

module.exports = {

    get: async (req, res) => {

        const { name } = req.query

        try {
            const videogames = await service.get(name)
            return res.send({ count: videogames.length, videogames })
        } catch (e) {
            return res.status(404).send({ error: e, message: "No games found" })
        }

    },

    getId: async (req, res) => {
        const { id } = req.params

        try {
            const videogame = await service.getId(id)
            return res.send(videogame)
        }
        catch (e) {
            return res.status(404).send({ error: e, message: "No game found" })
        }

    },

    post: async (req, res) => {

        try {
            const response = await service.post(req.body)
            return res.status(201).send(response)
        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e, message: "Failed to post a videogame"})
        }

    }

}