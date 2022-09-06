import React from "react"
import { Link } from "react-router-dom"

import s from "./style.module.css"

export default function Landing() {

    return (
        <div className={`${s.div}`}>
            <h1 className={`${s.title}`}>Henry games</h1>
            <Link to="/games" className={`${s.button}`}>Show videogames</Link>
        </div>
    )

}