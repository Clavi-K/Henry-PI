const axios = require("axios")

const { Videogame } = require("../db")
const { getFromVideogames,
    videogameGenreIntertion,
    videogamePlatformInsertion,
    dateValidator,
    dateFormatter } = require("../utils")

module.exports = {

    get: async (name) => {
        try {

            const arr = await getFromVideogames()
            let index = 1

            while (index <= 5) {

                const response = await axios.get(`${process.env.URL}/games?key=${process.env.API_KEY}${name ? `&search=${name}` : ""}&page=${index}`)
                response.data.results.map(v =>
                    arr.push({
                        id: v.id,
                        name: v.name,
                        background_image: v.background_image,
                        Genres: v.genres,
                        rating: v.rating
                    })
                )

                index++

            }

            return arr.slice(0, 100)

        } catch (e) {
            throw new Error("Failed to get all videogames")
        }
    },

    getId: async (id) => {

        try {

            let videogame

            if (isNaN(Number(id))) {

                videogame = await Videogame.findOne({ where: { id }, include: ["Genres", "Platforms"] })
                videogame = videogame.toJSON()
                videogame.released = dateFormatter(videogame.released)

            } else {

                const response = await axios.get(`${process.env.URL}/games/${id}?key=${process.env.API_KEY}`)
                videogame = {
                    id: response.data.id,
                    name: response.data.name,
                    Genres: response.data.genres,
                    description: response.data.description_raw,
                    released: dateFormatter(response.data.released),
                    rating: response.data.rating,
                    Platforms: response.data.platforms.map(p => p.platform),
                    background_image: response.data.background_image
                }

            }

            return videogame

        } catch (e) {
            throw new Error("Failed to get a videogame")
        }

    },

    post: async (body) => {

        if (!body.name || !body.description || !body.Genres || !body.Platforms) {
            throw new Error("Missing videogame attributes!")
        }

        const obj = {
            name: body.name,
            description: body.description,
            released: dateValidator(body.released),
            rating: body.rating ? Number(body.rating) : null,
            background_image: body.background_image ? body.background_image : null
        }

        try {
            const response = await Videogame.create(obj)

            await videogameGenreIntertion(response, body.Genres)
            await videogamePlatformInsertion(response, body.Platforms)

            return await Videogame.findOne({ where: { id: response.id }, include: ["Genres", "Platforms"] })
        } catch (e) {
 
            throw new Error("Failed to post a videogame")
        }

    }

}
