import {
    GET_VIDEOGAMES,
    GET_DETAILS,
    GET_GENRES,
    POST_VIDEOGAME,
    ERROR
} from "../actions/actions"

import { arrMerger } from "../../utils"

const initialState = {
    videogames: [],
    genres: [],
    game: {},
    error: undefined
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                error: undefined
            }

        case GET_DETAILS:
            return {
                ...state,
                videogame: action.payload,
                error: undefined
            }

        case POST_VIDEOGAME:
            return {
                ...state,
                genres: arrMerger(state.genres, action.payload.Genres),
                videogames: [...state.videogames, {...action.payload, Genres: genresMock(action.payload.Genres)}],
                error: undefined
            }

        case GET_GENRES:
            return {
                ...state,
                genres: action.payload,
                error: undefined
            }

        case ERROR:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state

    }

}

function genresMock(arr) {
    const result = []
    for (const el of arr) {
        result.push({ name: el })
    }

    return result
}

export default reducer