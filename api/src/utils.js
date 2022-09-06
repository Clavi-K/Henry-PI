const { Videogame } = require("./db")
const platformService = require("./services/platforms.service")
const genreService = require("./services/genres.service")

/* ------------------------VIDEOGAME SERVICE------------------------ */

async function getFromVideogames() {

    try {
        return await Videogame.findAll({ where: {}, include: "Genres" })
    } catch (e) {
        return []
    }

}

async function videogameGenreIntertion(vid, genres) {

    const databaseGenres = []

    for (const g of genres) {
        databaseGenres.push(await genreService.getOrCreateName(g))
    }

    await vid.addGenres(databaseGenres)

}

async function videogamePlatformInsertion(vid, platforms) {
    
    const databasePlatforms = []

    for (const p of platforms) {
        databasePlatforms.push(await platformService.getOrCreateName(p))
    }

    await vid.addPlatforms(databasePlatforms)

}

function dateValidator(date) {

    if (date.split("-").length !== 3) {
        return "-"
    }

    for (const num of date.split("-")) {

        if (!Number(num)) {
            return "-"
        }

    }

    return date

}

function dateFormatter(date) {
    const arrDate = date.split("-").reverse()
    return arrDate.join("/")
}

/* ------------------------------------------------ */

module.exports = {
    getFromVideogames,
    videogameGenreIntertion,
    videogamePlatformInsertion,
    dateValidator,
    dateFormatter,
}