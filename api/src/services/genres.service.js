const axios = require("axios")

const { Genre } = require("../db")

module.exports = {

    getAll: async () => {

        try {
            let databaseArr = await getFromDatabase()

            if (databaseArr.length < 19) {
                const resultArr = await populateDatabase()
                databaseArr = resultArr.map(g => g.toJSON())
            }

            return databaseArr
        } catch (e) {
            throw new Error("Failed to get all videogame genres")
        }

    },

    getOrCreateName: async (name) => {

        try {
            const result = await Genre.findOne({ where: { name } })
            return result ? result : await Genre.create({ name })
        } catch (e) {
            throw new Error("Failed to get or create genre by name")
        }

    }


}

async function getFromDatabase() {

    try {

        const result = await Genre.findAll({ where: {} })
        let formattedArr = result.map(g => g.toJSON())

        return formattedArr
    } catch (e) {
        return []
    }

}

async function populateDatabase() {

    try {
        const response = await axios.get(`${process.env.URL}/genres?key=${process.env.API_KEY}`)

        const formattedArr = response.data.results.map(g => {
            return {
                name: g.name
            }
        })

        return await Genre.bulkCreate(formattedArr, {ignoreDuplicates: true})
    } catch (e) {
        throw new Error("Failed to populate database")
    }

}