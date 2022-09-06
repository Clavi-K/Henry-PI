const { Platform } = require("../db")

module.exports = {

    get: async () => {

        try {
            await Platform.findAll({ where: {} })
        } catch (e) {
            return []
        }

    },

    getOrCreateName: async (name) => {

        try {
            const result = await Platform.findOne({ where: { name } })
            return result ? result : await Platform.create({ name })
        } catch (e) {
            throw new Error("Failed to get or create genre by name")
        }

    }

}