/* -----------------------------------------------CARDS METHODS----------------------------------------------- */

export function filterGenre(genre, videogames) {
    const genreResult = []

    if (genre !== "all") {

        videogames.map(v => {
            if (!v.genres) v.genres = v.Genres
            v.genres.map(g => {
                if (g.name === genre && !genreResult.includes(v)) {
                    genreResult.push(v)
                }
            })

        })

    }

    return genreResult.length ? genreResult : videogames
}

export function filterOrigin(origin, videogames) {
    const originResult = []

    if (origin !== "all") {

        videogames.map(v => {

            if (origin === "api" && !isNaN(Number(v.id))) {
                originResult.push(v)
            } else if (origin === "user" && isNaN(Number(v.id))) {
                originResult.push(v)
            }

        })

    } else {
        return videogames
    }

    return originResult.length ? originResult : []
}

export function orderHandler(order, videogames) {
    if (order.type === "name") {
        return orderByName(order.way, videogames)
    } else {
        return orderByRating(order.way, videogames)
    }
}

function orderByName(nameOrder, videogames) {

    if (!nameOrder) {
        return videogames.sort((a, b) => a.name.localeCompare(b.name))
    } else {
        return videogames.sort((a, b) => b.name.localeCompare(a.name))
    }

}

function orderByRating(ratingOrder, videogames) {

    if (!ratingOrder) {
        return videogames.sort((a, b) => b.rating - a.rating)
    } else {
        return videogames.sort((a, b) => a.rating - b.rating)
    }
}

export function gameSearch(input, videogames) {
    return videogames.filter(v => v.name.includes(input))
}

/* ---------------------------------------------------------------------------------------------- */

/* -----------------------------------------------CREATE METHODS----------------------------------------------- */

export function validate(obj, names) {
    const errors = {}

    if (names) {
        if (!obj.name || obj.name.trim().length === 0 || names.includes(obj.name)) {
            errors.name = "Invalid name!"
        }
    } else {
        errors.name = "Can't check names just yet!"
    }

    if (!obj.description || obj.description === "" || obj.description === undefined) {
        errors.description = "Invalid description!"
    }

    if (!dateValidator(obj.released)) {
        errors.released = "Invalid date!"
    }

    if (!arrayValidator(obj.genres)) {
        errors.genres = "Missing genres!"
    }

    if (!arrayValidator(obj.platforms)) {
        errors.platforms = "Missing platforms!"
    }

    return errors
}

function dateValidator(date) {

    if (!date || date.split("-").length !== 3) {
        return false
    }

    for (const number of date.split("-")) {
        if (!Number(number)) {
            return false
        }
    }

    return true

}

function arrayValidator(arr) {

    for (const str of arr) {
        if (!str || str.trim().length === 0) {
            return false
        }
    }
    return true
}

/* ---------------------------------------------------------------------------------------------- */