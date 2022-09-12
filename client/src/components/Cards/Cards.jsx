import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { filterGenre, filterOrigin, orderHandler, gameSearch } from "../../utils"
import { getGenres, getVideogames } from "../../redux/actions/actions";

import Card from "../Card/Card"
import Pagination from "../Pagination/Pagination";

import s from "./style.module.css"

export default function Cards() {

    /* ----------REDUX THINGS---------- */

    const dispatch = useDispatch()
    let videogames = useSelector(state => state.videogames)
    const genres = useSelector(state => state.genres)
    const error = useSelector(state => state.error)

    useEffect(() => {
        if (!videogames || !videogames.length) dispatch(getVideogames())
        if (!genres || !genres.length) dispatch(getGenres())
    }, [])

    /* --------------------*/

    /*----------LOCAL STATES---------- */

    const [filters, setFilters] = useState({ genre: "all", origin: "all", order: { type: "name", way: true } })
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(15)
    const [search, setSearch] = useState("")

    /* -------------------- */

    /* ----------LOCAL METHODS---------- */

    const onChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        })
        setCurrentPage(1)
    }

    const searchOnChange = (e) => {
        setSearch(e.target.value)
        setCurrentPage(1)
    }

    const onClick = (e) => {
        setFilters((currentState) => {
            return {
                ...currentState,
                order: {
                    type: currentState.order.type,
                    way: !currentState.order.way
                }
            }
        })
    }

    const changeOrder = (e) => {
        setFilters({
            ...filters,
            order: {
                [e.target.name]: e.target.value,
                way: filters.order.way
            }
        })
    }

    /* -------------------- */

    if (videogames) {
        videogames = filterGenre(filters.genre, videogames)
        videogames = filterOrigin(filters.origin, videogames)
        videogames = orderHandler(filters.order, videogames)
        videogames = gameSearch(search, videogames)
    }

    /* ----------PAGINATION---------- */

    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage

    const currentPosts = videogames && videogames.length ? videogames.slice(firstPostIndex, lastPostIndex) : null

    /* -------------------- */

    return (
        <div className={`${s.screen}`}>
            <nav className={`${s.navBar}`}>
                <h3>Henry games</h3>

                <div className={`${s.select}`}>
                    <label htmlFor="genre">Filter by genre</label>

                    <select className={`background ${s.selection}`} name="genre" id="Genres" onChange={onChange}>
                        <option className="blackBackground" value="all">All</option>
                        {genres ? genres.map(g => <option className="blackBackground" key={g.name} name="genre" value={g.name} onChange={onChange}>{g.name}</option>) : <option>Something went wrong :c</option>}
                    </select>
                </div>

                <div className={`${s.select}`}>
                    <label htmlFor="origin">Filter by origin</label>

                    <select className={`background ${s.selection}`} name="origin" id="Origin" onChange={onChange}>
                        <option className="blackBackground" value="all" >All</option>
                        <option className="blackBackground" value="api" >From API</option>
                        <option className="blackBackground" value="user" >Created by users</option>
                    </select>

                </div>

                <div className={`${s.order}`}>

                    <div className={`${s.select}`}>
                        <label htmlFor="type">Order by</label>
                        <select className="background" name="type" id="Order" onChange={changeOrder}>
                            <option className="blackBackground" value="name">Name</option>
                            <option className="blackBackground" value="rating">Rating</option>
                        </select>
                    </div>

                    <button onClick={onClick} className={`${s.buttonOrder}`} >{filters.order.way ? "⬆" : "⬇"}</button>
                </div>

                <input className={`${s.search}`} type="text" value={search} name="search" id="search" onChange={searchOnChange} placeholder="Look for a game:" />

                <Link className={`${s.create}`} to="/create">Create a videogame!</Link>
            </nav>

            <hr className={`${s.hr}`} />

            <div className={`${s.container}`}>
                {
                    currentPosts ? currentPosts.map(v => <Card key={v.id} id={v.id} background_image={v.background_image} name={v.name} Genres={v.Genres} />) :
                        error ? <h1>{error}</h1> :
                            !currentPosts && !videogames ? <h1>(Loading spinner placeholder)</h1> :
                                <h1>No games found :c</h1>
                }
            </div>

            <Pagination totalPosts={videogames ? videogames.length : 0} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} />
        </div>
    )

}