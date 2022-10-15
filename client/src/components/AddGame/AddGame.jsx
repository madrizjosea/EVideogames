import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addGame} from "../../redux/actions/games/index";
import { useDispatch, useSelector } from "react-redux";
import style from "./AddGame.module.css"
import {getGenres} from  "../../redux/actions/genres/index"
function validate(input){  //usado para validad errores 

    let errors = {};

    if(input.name.length >= 0 && !input.name.match(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/)){
        errors.name = 'Solo se permiten letras y sin espacios al final!'
    }
     if (!input.description){
        errors.description = "Se requiere una descripción";
    }
    if (!input.released){
        errors.released = "Se requiere una fecha de lanzamiento";
    } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(input.released) === false){
        errors.released = "Formato de fecha debe ser DD/MM/AAAA"
    }
    if (!input.rating){
        errors.rating = "Se requiere una puntuación de Rating. El Rating debe ser desde 0.1 hasta 5 puntos";
    } else if (/^[+-]?\d+([,.]\d+)?$/.test(input.rating) === false){
        errors.rating = "Formato de Rating debe ser como de minimo 0.1 hasta 5"
    }
    if(input.image.length > 0 && !input.image.match(/^(ftp|http|https):\/\/[^ "]+$/)){
        errors.image = 'La imagen tiene que ser un URL'
    }else errors.image = null

    return errors;
}


export default function AddGame(){

    const dispatch = useDispatch();

    const genres = useSelector((state) => state.genres);

    const [errors, setErrors] = useState({});

    let platforms = [
        "PC",
        "PlayStation 5",
        "Xbox One",
        "PlayStation 4",
        "Xbox Series S/X",
        "Nintendo Switch",
        "iOS",
        "Android",
        "Nintendo 3DS",
        "Nintendo DS",
        "Nintendo DSi",
        "macOS",
        "Linux",
        "Xbox 360",
        "Xbox",
        "PlayStation 3",
        "PlayStation 2",
        "PlayStation",
        "PS Vita",
        "PSP",
        "Wii U",
        "Wii",
        "GameCube",
        "Nintendo 64",
        "Game Boy Advance",
        "Game Boy Color",
        "Game Boy",
        "SNES",
        "NES",
        "Classic Macintosh",
        "Apple II",
        "Commodore / Amiga",
        "Atari 7800",
        "Atari 5200",
        "Atari 2600",
        "Atari Flashback",
        "Atari 8-bit",
        "Atari ST",
        "Atari Lynx",
        "Atari XEGS",
        "Genesis",
        "SEGA Saturn",
        "SEGA CD",
        "SEGA 32X",
        "SEGA Master System",
        "Dreamcast",
        "3DO",
        "Jaguar",
        "Game Gear",
        "Neo Geo",
      ];

    const [input, setInput] = useState({
        name: "",
	    description: "",
	    released:"",
        rating:"",
        platforms: [],
        genres:[],
	    image: ""
    });

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);
    
    

    function handleChange(e){ //funcion para modificar el input segun lo que se escriba
        setInput({
            ...input,
            [e.target.name]: e.target.value //ademas de lo que tiene agrega el target.value de lo que esta modificando segun el target.name
        });
        setErrors(validate({ //tambien setea el estado de error usando la funcion creada arriba, usamos el validate para ver si cumplimos o no con los requisitos
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleGenres(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value] //cuando le mando un genero, me trae lo que ya habia y me concatena el nuevo genero a agregar al input
        })
    }

    function handlePlatforms(e){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    }
    
    function handleSubmit(e){
        e.preventDefault();
        if(!input.name || !input.description || !input.released || !input.released.includes("/") || !input.rating || input.rating > 5 || input.rating <= 0 || !input.rating.includes(".") || input.platforms.length < 1 || input.genres.length < 1 || !input.image || !input.image.includes("https")){
            e.preventDefault();
            alert("Falta una propiedad para crear tu Videojuego!")
        } else {
            dispatch(addGame(input)); //despacho al store la creacion del videojuego con lo que el usuario dio por input
            alert("Videojuego creado con éxito!");
            setInput({  //limpio el input luego de crear el juego
            name: "",
            description: "",
            released:"",
            rating:"",
            platforms: [],
            genres:[],
            image: ""
            
            });
        }
    }

    function handleDeletePlatforms(e){ //funcion para eliminar plataformas que no queremos crear
        setInput({
            ...input,
            platforms: input.platforms.filter(data => data !==e) //filtro las plataformas por todo lo que no sea el elemento a eliminar
        })
    }

    function handleDeleteGenre(e){  //funcion para eliminar generos que no queremos crear
        setInput({
            ...input,
            genres: input.genres.filter(data => data !== e) //filtro los generos por todo lo que no sea el elemento a eliminar
        })
    }

    return (
        <div className={style.div}>
            <Link to="/home">
                <button className={style.boton}>Volver al Home</button>
            </Link>
            <form className={style.form} onSubmit={e => handleSubmit(e)}>
                <h1 className={style.h1}>Crea tu juego</h1>
                <div>
                    <input
                       className={style.input}
                       type="text"
                       value={input.name}
                       name="name"
                       onChange={e => handleChange(e)}
                       required
                       placeholder="Introduzca un Nombre"
                    />
                    {errors.name && (
                        <p className={style.error}>{errors.name}</p>  //si un error existe renderiza el texto de error
                    )}
                </div>
                <div>
                    <input
                       className={style.input}
                       type="text"
                       value={input.description}
                       name="description"
                       onChange={e => handleChange(e)}
                       required
                       placeholder="Introduzca una Descripción"
                    />
                    {errors.description && (
                        <p className={style.error}>{errors.description}</p>
                    )}
                </div>
                <div>
                    <input
                       className={style.input}
                       type="text"
                       value={input.released}
                       name="released"
                       onChange={e => handleChange(e)}
                       required
                       placeholder="Introduzca una Fecha de lanzamiento"
                    />
                    {errors.released && (
                        <p className={style.error}>{errors.released}</p>
                    )}
                </div>
                <div>
                    <input
                       className={style.input}
                       type="text"
                       value={input.rating}
                       name="rating"
                       onChange={e => handleChange(e)}
                       required
                       placeholder="Introduzca un Rating"
                    />
                    {errors.rating && (
                        <p className={style.error}>{errors.rating}</p>
                    )}
                </div>
                <div>
                    <input
                       className={style.input}
                       type="text"
                       value={input.image}
                       name="image"
                       onChange={e => handleChange(e)}
                       required
                       placeholder="Introduzca una imagen"
                    />
                    {errors.image && (
                        <p className={style.error}>{errors.image}</p>
                    )}
                </div>
                <select className={style.select1} onChange={e => handleGenres(e)}>
                    <option hidden={true}>Género</option>
                    {genres.map(data => (
                        <option value={data.name}>{data.name}</option>
                    ))}
                </select>
                <select className={style.select2} onChange={e => handlePlatforms(e)}>
                    <option hidden={true}>Plataforma</option>
                    {platforms.map(data => (
                        <option value={data}>{data}</option>
                    ))}
                </select>
                <button className={style.botonCrear} type="submit">Crear juego</button>
            </form>
            <div>
                {input.genres.map(data => ( //renderiza cada genero que se vaya añadiendo al input como un boton
                    <div className={style.divG}>
                        <button className={style.botonG} onClick={() => handleDeleteGenre(data)}>{data}</button>
                    </div>
                ))} {/* agarra mis generos y va renderizando cada cosa que selecciono */}
                {input.platforms.map(data => (
                    <div className={style.divP}>
                        <button className={style.botonP} onClick={() => handleDeletePlatforms(data)}>{data}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}