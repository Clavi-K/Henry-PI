import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"

import { getVideogames } from "../../redux/actions/actions";
import { validate } from "../../utils";

import s from "./style.module.css"

export default function Create() {

    /* ----------API THINGS---------- */

    const dispatch = useDispatch()
    const games = useSelector(state => state.videogames)
    const names = games ? games.map(v => v.name) : null

    useEffect(() => {
        dispatch(getVideogames())
    }, [])

    /*--------------------*/

    /* ---------- LOCAL STATES ---------- */

    const [errors, setErrors] = useState({})
    const [fields, setFields] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        background_image: "",
        genres: [""],
        platforms: [""]
    })

    /* -------------------- */

    /* ---------- LOCAL METHODS ----------*/

    const onChange = (e) => {
        setFields({ ...fields, [e.target.name]: e.target.value })
        setErrors(validate({ ...fields, [e.target.name]: e.target.value }, names))
    }

    const dynamicChange = (e) => {
        let dynamicCopy = []
        let flag = ""

        if (e.target.name.indexOf("genre") !== -1) {
            dynamicCopy = [...fields.genres]
            flag = "genres"
        } else if (e.target.name.indexOf("platform") !== -1) {
            dynamicCopy = [...fields.platforms]
            flag = "platforms"
        }
        dynamicCopy[e.target.id] = e.target.value

        setFields({ ...fields, [flag]: dynamicCopy })
        setErrors(validate({ ...fields, [flag]: dynamicCopy }, names))
    }

    const dynamicAdd = (e) => {
        if (e.target.name === "genre") {
            setFields({ ...fields, genres: [...fields.genres, ""] })
        } else if (e.target.name === "platform") {
            setFields({ ...fields, platforms: [...fields.platforms, ""] })
        }
    }

    const dynamicTake = (e) => {

        if (e.target.name === "genre") {
            if (fields.genres.length > 1) setFields({ ...fields, genres: [...fields.genres.slice(0, fields.genres.length - 1)] })
        } else if (e.target.name === "platform") {
            if (fields.platforms.length > 1) setFields({ ...fields, platforms: [...fields.platforms.slice(0, fields.platforms.length - 1)] })
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8082/videogames", fields)
        window.location.replace(`http://localhost:3000/games`)
    }

    /*--------------------*/

    return (
        <div className={`${s.screen}`}>

            <div className={`${s.header}`}>
                <h1 className={`${s.title}`}>Create a videogame</h1>
                <hr className={`${s.hr}`} />
            </div>

            <form className={`${s.form}`} action="http://localhost:8082/videogames" method="POST" onSubmit={onSubmit}>

                <div className={`${s.field}`}>
                    <label htmlFor="name">Type the videogame name</label>
                    <input type="text" name="name" value={fields.name} onChange={onChange} />
                    <p className={`${s.error}`}>{errors.name ? errors.name : null}</p>
                </div>

                <div className={`${s.field}`}>
                    <label htmlFor="description">Type the videogame description</label>
                    <input type="text" name="description" value={fields.description} onChange={onChange} />
                    <p className={`${s.error}`}>{errors.description ? errors.description : null}</p>
                </div>

                <div className={`${s.field}`}>
                    <label htmlFor="released">Enter the videogame release date</label>
                    <input type="date" name="released" value={fields.released} onChange={onChange} />
                    <p className={`${s.error}`}>{errors.released ? errors.released : null}</p>
                </div>

                <div className={`${s.field}`}>
                    <label htmlFor="name">Type the videogame rating</label>
                    <input type="number" name="rating" value={fields.rating} onChange={onChange} min="1" max="5" />
                    <br />
                </div>

                <div className={`${s.field}`}>
                    <label htmlFor="background_image">Enter an image link of the videogame</label>
                    <input type="url" name="background_image" value={fields.background_image} onChange={onChange} />
                </div>

                <div className={`${s.field} ${s.genres}`}>
                    <p>Enter videogame genres</p>

                    {
                        fields.genres.map((g, index) => {
                            return (<div key={`Genre${index}`}>
                                <label htmlFor={`genre${index}`}>{`Genre N°${index + 1} `}</label>

                                <input type="text"
                                    name={`genre${index}`}
                                    id={index}
                                    data-name="name"
                                    value={g}
                                    onChange={dynamicChange}
                                />
                            </div>)
                        })
                    }
                    <p className={`${s.error}`}>{errors.genres ? errors.genres : null}</p>

                    <div className={`${s.buttons}`}>
                        <input className={`${s.hover}`} type="button" value="Add a genre" name="genre" onClick={dynamicAdd} />
                        <input className={`${s.hover}`} type="button" value="Take a genre" name="genre" onClick={dynamicTake} />
                    </div>

                </div>

                <div className={`${s.field} ${s.platforms}`}>
                    <p>Enter videogame platforms</p>

                    {
                        fields.platforms.map((p, index) => {
                            return (<div key={`Platform${index}`}>
                                <label htmlFor={`platform${index}`}>{`Platform N°${index + 1} `}</label>

                                <input type="text"
                                    name={`platform${index}`}
                                    id={index}
                                    value={p}
                                    onChange={dynamicChange}
                                />
                            </div>)
                        })
                    }
                    <p className={`${s.error}`}>{errors.platforms ? errors.platforms : null}</p>

                    <div className={`${s.buttons}`}>
                        <input className={`${s.hover}`} type="button" value="Add a platform" name="platform" onClick={dynamicAdd} />
                        <input className={`${s.hover}`} type="button" value="Take a platform" name="platform" onClick={dynamicTake} />
                    </div>
                </div>

                <div className={`${s.buttonContainer}`}>
                    {
                        JSON.stringify(errors) === "{}" && names !== null ?
                            <input className={`${s.hover} ${s.createButton}`} type="submit" value="Create!" />
                            :
                            null
                    }
                </div>

            </form>
        </div>
    )

}
