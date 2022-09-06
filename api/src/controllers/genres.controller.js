const service = require("../services/genres.service.js")

module.exports = {

    getAll: async (req, res) => {

        try {
            const response = await service.getAll()
            return res.send({ genres: response })
        } catch (e) {
            return res.status(400).send({ error: e, message: "Failed to return game genres" })
        }

    }

}