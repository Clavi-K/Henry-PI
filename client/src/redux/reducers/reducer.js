import {
    GET_VIDEOGAMES,
    GET_DETAILS,
    GET_GENRES,
    POST_VIDEOGAME,
    ERROR,
    EMPTY_DETAILS
} from "../actions/actions"

import { arrMerger } from "../../utils"

const initialState = {
    videogames: undefined,
    genres: [],
    videogame: {},
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
                videogames: [...state.videogames, action.payload],
                genres: arrMerger(state.genres, action.payload.Genres),
                error: undefined
            }

        case GET_GENRES:
            return {
                ...state,
                genres: action.payload,
                error: undefined
            }

        case EMPTY_DETAILS:
            return {
                ...state,
                videogame: {}
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

export default reducer