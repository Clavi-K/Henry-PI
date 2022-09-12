import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import s from "./style.module.css"
import img from "../../img/no_image.jpg"
import { emptyDetails, getDetails } from "../../redux/actions/actions";

export default function Details() {
    const id = useParams()
    const dispatch = useDispatch()
    const videogame = useSelector(state => state.videogame)
    const error = useSelector(state => state.error)

    useEffect(() => {
        dispatch(getDetails(id))
        return dispatch(emptyDetails())
    }, [])

    return (<div>
        {
            videogame.name ?
                <>
                    <div className={`${s.container}`}>

                        <div className={`${s.left}`}>
                            <img className={`${s.image}`} src={`${videogame.background_image ? videogame.background_image : img}`} />

                            <div>
                                <h2>Genres:</h2>
                                <ul className={`${s.ullist}`}>
                                    {videogame.Genres.map((g, i) => <li key={i}>{g.name}</li>)}
                                </ul>
                            </div>

                            <div>
                                <h2>Platforms:</h2>
                                <ul className={`${s.ulPlat}`}>
                                    {videogame.Platforms.map((p, i) => <li key={i}>{p.name}</li>)}
                                </ul>
                            </div>

                            <p>Release date: {videogame.released}</p>

                        </div>

                        <div className={`${s.right}`}>
                            <h1>{videogame.name} {videogame.rating !== 0 ? "⭐" + videogame.rating : "⭐0: No rating"}</h1>
                            <p>{videogame.description}</p>
                        </div>

                    </div>
                </> :
                error ? <h1>{error} (No game found)</h1> : <h1>(Loading spinner placeholder)</h1>
        }
    </div>)

}