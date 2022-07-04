import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorBlock from '../errorBlock/ErrorBlock';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = (props) => {
    const [char, setChar] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const marvelService = new MarvelService

    useEffect(() => {
        updateChar()
    }, [])

    function updateChar() {
        setLoading(true)
        const id = Math.floor(Math.random() * 400 + 1011000)
        marvelService
            .getCharacter(id)
            .then(onCharLoad)
            .catch(onError)
    }

    function onCharLoad(char) {
        setChar(char)
        setLoading(false)
        setError(false)
    }

    function onError() {
        setError(true)
        setLoading(false)
    }

    const errorBlock = error && !loading ? <ErrorBlock /> : null
    const spinner = loading ? <Spinner /> : null
    const infoBlock = !(loading || error) ?
        <InfoBlock
            char={char}
            onCharSelected={() => props.onCharSelected(char.id)}
        />
        : null

    return (
        <div className="randomchar">
            {spinner}
            {infoBlock}
            {errorBlock}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button
                    className="button button__main"
                    onClick={updateChar}
                >
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

const InfoBlock = ({ char, onCharSelected }) => {
    const { name, description, thumbnail, homepage, wiki, hasImg } = char

    return (
        <div className="randomchar__block">
            <img
                src={thumbnail}
                alt="Random character"
                className="randomchar__img"
                style={hasImg ? null : { objectFit: "contain" }}
                onClick={onCharSelected}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main" target="_blank">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary" target="_blank">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;