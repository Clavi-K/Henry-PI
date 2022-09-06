import React from "react";

import s from "./style.module.css"

export default function Pagination({ totalPosts, postsPerPage, setCurrentPage }) {
    let pages = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i)
    }


    return (
        <div className={`${s.container}`}>
            <button onClick={() => setCurrentPage((curr) => curr - 1)}>⬅</button>
            {
                pages.map((p, index) => {
                    return <button key={index} onClick={() => setCurrentPage(p)}>{p}</button>
                })
            }
            <button onClick={() => setCurrentPage((curr) => curr + 1)}>➡</button>
        </div>
    )

}