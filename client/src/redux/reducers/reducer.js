import {
    GET_VIDEOGAMES,
    GET_DETAILS,
    GET_GENRES,
    POST_VIDEOGAME,
    ERROR
} from "../actions/actions"

const initialState = {
    houses: [],
    genres: [],
    house: {},
    error: undefined
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                errror: undefined
            }

        case GET_DETAILS:
            return {
                ...state,
                videogame: action.payload,
                errror: undefined
            }

        case POST_VIDEOGAME:
            return {
                ...state,
                videgoames: [...state.videogames, action.payload],
                errror: undefined
            }

        case GET_GENRES:
            return {
                ...state,
                genres: action.payload,
                errror: undefined
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