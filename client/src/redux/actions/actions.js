const axios = require("axios")

export const GET_VIDEOGAMES = "GET_VIDEOGAMES"
export const GET_DETAILS = "GET_DETAILS"
export const POST_VIDEOGAME = "POST_VIDEOGAME"
export const GET_GENRES = "GET_GENRES"
export const ERROR = "ERROR"

export const getVideogames = () => dispatch => {

    return axios.get("http://localhost:8082/videogames")
        .then(response => { dispatch({ type: GET_VIDEOGAMES, payload: response.data.videogames }) })

}

export const getDetails = (id) => dispatch => {

    return axios.get(`http://localhost:8082/videogames/${id.id}`)
        .then(response => dispatch({ type: GET_DETAILS, payload: response.data }))
        .catch(response => dispatch({type: ERROR, payload: response.message}))

}

export const postVideogame = (videogame) => dispatch => {

    return axios.post("http://localhost:8082/videogames", videogame)
        .then(response => dispatch({ type: POST_VIDEOGAME, payload: response.data }))

}

export const getGenres = () => dispatch => {

    return axios.get("http://localhost:8082/genres")
        .then(response => dispatch({ type: GET_GENRES, payload: response.data.genres }))

}



