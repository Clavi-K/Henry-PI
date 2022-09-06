import React from "react"
import { Link } from "react-router-dom"

import s from "./style.module.css"
import img from "../../img/no_image.jpg"

export default function Card({ background_image, name, genres, rating, id }) {

    return (
        <div className={`${s.card}`}>
            <img className={`${s.image}`} src={background_image ? background_image : img} alt={`${name} cover`} />
            <h3 className={`${s.center} ${s.title}`}>{name}</h3>

            <ul className={`${s.list}`}>
                {genres ? genres.map(g => <li key={g.name}>{g.name}</li>) : null}
            </ul>

            <Link className={`${s.link}`} to={`/games/${id}`}>See details</Link>

        </div>
    )

}